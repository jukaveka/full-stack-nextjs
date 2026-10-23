"use client"

import { useNotification } from "./NotificationProvider"

const Notification = () => {
  const { message, type } = useNotification()

  if (!message) return null

  const textColor = type === "success" ? `text-green-500` : `text-red-500`

  return <div className={`bg-black-800 px-6 py-3 ${textColor}`}>{message}</div>
}

export default Notification