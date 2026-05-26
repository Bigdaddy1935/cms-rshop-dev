# Review workflow — `dev` → `main` → deploy

روند کاری وقتی برنامه‌نویس تغییری رو روی برنچ `dev` پوش می‌کنه.

## یک خط اجرا (هر بار)

```bash
cd /Users/mac/rshop/cms-rshop-dev
bin/review-dev.sh
```

این اسکریپت **فقط می‌خونه** — هیچ branch رو تغییر نمی‌ده، چیزی push نمی‌کنه. خروجی نشون می‌ده چی روی dev اومده که روی main نیست، چه فایل‌هایی عوض شدن، و اگه فایل‌های حساسی (lockfile, env, middleware, next.config, Dockerfile) دست خوردن یه warning می‌ده.

## مراحل دقیق

### ۱. اسکریپت رو اجرا کن
```bash
bin/review-dev.sh
```

خروجی نمونه:
```
→ origin/dev is 3 commit(s) ahead of origin/main.

→ Commits on dev not on main:
abc1234 fix: validation در فرم سفارش
def5678 feat: ستون جدید در جدول کاربران
9876543 chore: update dependencies

→ Files changed:
 src/app/orders/page.tsx     | 12 ++++++--
 src/components/UserTable.tsx | 30 +++++++++++++++--
 package-lock.json           | 124 ++++++++++++++++++++++++

⚠ Risky files touched — review carefully:
    package-lock.json
```

### ۲. کد رو با دقت ببین

```bash
# diff کامل
git diff origin/main..origin/dev

# یا فقط یه فایل خاص
git diff origin/main..origin/dev -- src/components/UserTable.tsx
```

اگه می‌خوای AI review بگیری، اسم branch یا output ابزار رو به Claude بده — می‌تونه commit به commit بررسی کنه و bug ها یا regression ها رو پیدا کنه.

### ۳. لوکال تست کن

```bash
git checkout dev
git pull --ff-only origin dev
npm ci                  # اگه package-lock عوض شده
npm run build           # حتماً تست build
npm run dev             # smoke test تو browser
```

اگه build error داد، نباید deploy بشه. یه issue باز کن یا به برنامه‌نویس بگو.

### ۴. اگه تأیید شد، merge و deploy

```bash
git checkout main
git pull --ff-only origin main
git merge --no-ff origin/dev -m "Merge dev: <خلاصه یه‌خطی از چی اومد>"
git push origin main
caprover deploy         # ship به rshop-cms
```

`--no-ff` خط history رو حفظ می‌کنه؛ بعداً می‌تونی ببینی این batch از تغییرات از یه branch جدا اومده بود.

### ۵. اگه تأیید نشد

هیچ merge نکن. فقط به برنامه‌نویس بگو چی رو fix کنه. اون commit بیشتر به dev می‌زنه و دوباره `bin/review-dev.sh` اجرا کن.

اگه می‌خوای dev رو reset یا rebase کنی، با احتیاط — هرگز force push به main نکن. force push به dev فقط با توافق با برنامه‌نویس.

## نکات

- **هرگز deploy از dev نکن**. همیشه merge → main → deploy. این تضمین می‌کنه چیزی که روی production هست، روی main هم هست (برای rollback و history).
- **فایل‌های حساس** که اسکریپت warning می‌ده:
  - `package-lock.json` / `pnpm-lock.yaml` / `yarn.lock` — تغییرات وابستگی‌ها
  - `.env*` — اگه به‌اشتباه committed شده باشه، secrets ممکنه leak شده باشه
  - `Dockerfile`, `captain-definition` — تغییر deploy
  - `middleware.ts` — تغییر auth/role checks
  - `next.config.{js,mjs,ts}` — تغییر build behavior
- **اگه `git merge` conflict داد** — یعنی main هم تغییر کرده. برنامه‌نویس باید `git rebase main` کنه روی dev و دوباره push کنه. بعد دوباره از مرحله ۱ شروع.
- **برای rollback** بعد از deploy:
  ```bash
  git checkout main
  git revert -m 1 <merge-commit-hash>
  git push origin main
  caprover deploy
  ```
