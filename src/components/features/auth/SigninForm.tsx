"use client";

import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  InputOtp,
  Input,
  Button,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  useRequestOtpMutation,
  useVerifyOtpMutation,
} from "@/core/hooks/api/useSignin";
import useOnlineStatus from "@/core/hooks/system/useOnlineStatus";
import useCountdown from "@/core/hooks/system/useCountdown";

import {
  containerVariants,
  itemVariants,
  tabContentVariants,
  mainCardMotion,
} from "@/core/motions/authPageVariants";
import LoginSuccessfully from "@/components/features/auth/LoginSuccessfully";

type Auth = "phone" | "otp";

const SigninForm = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<Auth>("phone");
  const [phoneValue, setPhoneValue] = useState("");
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(false);

  const online = useOnlineStatus();
  const otpTimer = useCountdown(30);

  const requestOtpMutation = useRequestOtpMutation();
  const verifyOtpMutation = useVerifyOtpMutation();

  const requesting =
    (requestOtpMutation as any)?.isPending ??
    (requestOtpMutation as any)?.isLoading ??
    false;
  const verifying =
    (verifyOtpMutation as any)?.isPending ??
    (verifyOtpMutation as any)?.isLoading ??
    false;

  useEffect(() => {
    if (phoneValue.length === 11) {
      sendPhoneApiCall();
      setCode("")
    }
  }, [phoneValue]);

  useEffect(() => {
    if (code.length === 6) sendOtpCodeApiCall();
  }, [code]);

  const handleTabChange = (key: string) => {
    if (key === "otp" && phoneValue.length < 11) return;
    setSelected(key as Auth);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setPhoneValue(val);
  };

  const offlineUser = () => {
    if (!online) {
      return false;
    }
  };

  const sendPhoneApiCall = () => {
    offlineUser();
    if (requesting) return;

    requestOtpMutation.mutate(phoneValue, {
      onSuccess: (res) => {
        if (res.ok) {
          setSelected("otp");
          otpTimer.start();
        }
      },
    });
  };

  const sendOtpCodeApiCall = () => {
    offlineUser();
    if (verifying || phoneValue.length !== 11 || code.length !== 6) return;

    verifyOtpMutation.mutate(
      { phone: phoneValue, code },
      {
        onSuccess: (res: any) => {
          if (res?.ok) {
            setSuccess(true);
            router.push("/admin/dashboard");
          }
        },
      }
    );
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center w-full px-4 overflow-hidden"
      dir="rtl"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(35rem_35rem_at_20%_10%,rgba(99,102,241,.12),transparent),radial-gradient(40rem_40rem_at_80%_110%,rgba(56,189,248,.15),transparent)]" />

      <LoginSuccessfully success={success} />

      <div className="flex flex-col">
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center text-center"
          animate="show"
          initial="hidden"
        >
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-48 mb-3 drop-shadow-md"
          />
        </motion.div>

        <motion.div
          className="relative p-[1px] rounded-3xl bg-gradient-to-br from-blue-200/70 via-white/50 to-purple-200/70 shadow-[0_20px_80px_-20px_rgba(99,102,241,0.35)]"
          {...mainCardMotion}
        >
          <motion.div
            className="max-w-[380px] w-[92vw] sm:w-[380px] rounded-3xl bg-white/70 backdrop-blur-xl"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <Card
              shadow="md"
              className="rounded-3xl bg-transparent border border-white/40"
            >
              <CardBody className="space-y-7 p-8">
                {/* header */}

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col items-center text-center"
                >
                  <h1 className="font-extrabold tracking-tight text-[20px] text-slate-800">
                    ورود به پنل
                  </h1>
                  <p className="text-slate-500 text-sm mt-2.5">
                    {selected === "phone"
                      ? "شماره تماس خود را وارد نمایید"
                      : "کد ارسال شده به تلفن خود را وارد نمایید"}
                  </p>
                </motion.div>

                {/* ✅ Tabs */}
                <motion.div variants={itemVariants}>
                  <Tabs
                    selectedKey={selected}
                    onSelectionChange={(key) => handleTabChange(key as string)}
                    variant="solid"
                    color="secondary"
                    className="flex items-center justify-center"
                    classNames={{
                      tabList: "w-full flex justify-center",
                    }}
                  >
                    <Tab key="phone" title="شماره تلفن">
                      <AnimatePresence mode="wait">
                        {selected === "phone" && (
                          <motion.div key="phone" {...tabContentVariants}>
                            <Input
                              style={{ direction: "ltr" }}
                              autoFocus
                              label="شماره تلفن خود را وارد کنید"
                              type="tel"
                              inputMode="tel"
                              variant="flat"
                              size="sm"
                              maxLength={11}
                              value={phoneValue}
                              onChange={handlePhoneChange}
                              isDisabled={requesting}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Tab>

                    <Tab key="otp" title="کد یک بار مصرف">
                      <AnimatePresence mode="wait">
                        {selected === "otp" && (
                          <motion.div key="otp" {...tabContentVariants}>
                            <div
                              style={{ direction: "ltr" }}
                              className="ltr flex items-center justify-center"
                            >
                              <InputOtp
                                length={6}
                                size="md"
                                autoFocus
                                value={code}
                                onValueChange={setCode}
                                isDisabled={verifying || !online}
                              />
                            </div>

                            {/* resend timer + progress */}
                            <div className="mt-4 flex flex-col items-center gap-2">
                              <div className="flex items-center justify-center gap-3 text-sm">
                                <Button
                                  size="sm"
                                  variant="flat"
                                  color="primary"
                                  isDisabled={
                                    !otpTimer.isFinished ||
                                    !online ||
                                    requesting
                                  }
                                  onPress={() => sendPhoneApiCall()}
                                  className="rounded-full"
                                >
                                  {otpTimer.isFinished
                                    ? "ارسال مجدد کد"
                                    : `ارسال مجدد تا ${otpTimer.mm}:${otpTimer.ss}`}
                                </Button>
                              </div>

                              <motion.div className="h-1 w-48 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-sky-400 to-fuchsia-400"
                                  initial={{ width: "100%" }}
                                  animate={{
                                    width: otpTimer.isFinished
                                      ? "0%"
                                      : `${(otpTimer.seconds / 30) * 100}%`,
                                  }}
                                  transition={{ duration: 0.9, ease: "linear" }}
                                />
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Tab>
                  </Tabs>
                </motion.div>

                {/* footer */}
                <motion.div
                  variants={itemVariants}
                  className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"
                />
                <motion.p
                  variants={itemVariants}
                  className="text-[11px] leading-5 text-slate-500 text-center"
                >
                  با ورود، شرایط استفاده و حریم خصوصی آرشاپ را می‌پذیرید.
                </motion.p>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SigninForm;
