"use client";

import React, { useState, cloneElement, isValidElement } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { FiAlertCircle } from "react-icons/fi";
import { ModalSize } from ".";
import OptionButton, { OptionButtonProps } from "../buttons/OptionButton";
import FormActionButtons from "@/components/common/FormActionButtons";

type BaseModalProps = {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => any;
  onCancel?: () => void;
  icon?: React.ReactNode;
  placement?: "auto" | "center" | "top" | "bottom";
  isConfirmDisabled?: boolean;
  isActiveFooter?: boolean;
  size?: ModalSize;
  trigger?: React.ReactElement<any> | React.ReactNode;
  triggerProps?: Omit<OptionButtonProps, "onClick"> | null; // ✅ پراپ‌های OptionButton
  confirmActionClose?: boolean;
};

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen: controlledIsOpen,
  onOpenChange,
  title = "توجه",
  children,
  confirmText = "تأیید",
  cancelText = "لغو",
  onConfirm,
  onCancel,
  placement = "auto",
  icon = <FiAlertCircle className="text-orange-400" />,
  isConfirmDisabled = false,
  isActiveFooter = true,
  size = "md",
  trigger,
  triggerProps = {
    title: "+ افزودن",
    className: "bg-secondary-light text-secondary",
  },
  confirmActionClose = false,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalOpen;

  const handleOpenChange = (open: boolean) => {
    onOpenChange?.(open);
    setInternalOpen(open);
  };

  const content =
    isValidElement(children) && typeof children.type !== "string"
      ? cloneElement(children as React.ReactElement<any>, {
          onOpenChange: handleOpenChange,
          isOpen,
        })
      : children;

  return (
    <>
      {/* ✅ trigger با دو حالت */}
      {trigger ? (
        isValidElement(trigger) ? (
          cloneElement(trigger as React.ReactElement<any>, {
            onClick: (e: any) => {
              (trigger as any).props.onClick?.(e);
              e?.stopPropagation();
              handleOpenChange(true);
            },
          })
        ) : (
          <div onClick={() => handleOpenChange(true)}>{trigger}</div>
        )
      ) : triggerProps ? (
        <OptionButton
          {...triggerProps}
          onClick={() => handleOpenChange(true)}
        />
      ) : null}

      {/* ✅ Modal */}
      <Modal
        dir="rtl"
        onClose={() => {
          onCancel?.();
        }}
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        placement={placement}
        size={size}
        isDismissable={false}
      >
        <ModalContent
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {(onClose) => (
            <>
              {title && (
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 font-normal">
                    <span className="text-2xl">{icon}</span>
                    <div className="text-[16px]">{title}</div>
                  </div>
                </ModalHeader>
              )}

              <ModalBody className="leading-7 max-h-[80vh] overflow-y-auto">
                {content || children}
                {isActiveFooter ? <div className="mb-12"></div> : ""}
                {isActiveFooter && (
                  <div className="absolute bg-white pt-2 bottom-0 right-0 left-0 w-full z-50">
                    <div className="mx-6">
                      <FormActionButtons
                        cancelText={cancelText}
                        submitText={confirmText}
                        onCancel={() => {
                          onCancel?.();
                          onClose();
                        }}
                        onSubmit={async () => {
                          if (confirmActionClose) {
                            onClose();
                          }
                          const result = await onConfirm?.();

                          if (result === true) {
                            handleOpenChange(false);
                          }
                        }}
                        isLoading={isConfirmDisabled}
                      />
                    </div>
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BaseModal;
