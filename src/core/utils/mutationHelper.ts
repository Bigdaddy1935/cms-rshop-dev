export const handleMutation = async <T>(
  mutationFn: () => Promise<T>,
  options?: {
    resetForm?: () => void;
    returnResponse?: boolean;
    redirect?: string;
  }
): Promise<boolean | T> => {
  const { resetForm, returnResponse = false } = options ?? {};

  try {
    const res = await mutationFn();

    if (res && (res as any)?.ok) {
      resetForm?.();
      return returnResponse ? res : true;
    }

    return false;
  } catch (error) {
    console.error("Mutation error:", error);
    return false;
  }
};
