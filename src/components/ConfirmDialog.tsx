"use client"
import React from "react"

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        onClick={onCancel}
      />
      {/* Dialog */}
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="bg-white rounded-[20px] p-8 max-w-md w-full mx-4 pointer-events-auto">
          <h2 className="text-[24px] font-medium text-center mb-4">{title}</h2>
          <p className="text-gray-500 text-center mb-8">{message}</p>
          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-6 rounded-lg text-white font-medium bg-black"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 px-6 rounded-lg bg-[#F6AF1F] text-black font-medium"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
