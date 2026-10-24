"use client"

import { useNotification } from "./NotificationProvider"

const Notification = () => {
  const { message, type } = useNotification()

  if (!message) return null

  const textColor = type === "success" ? `text-green-500` : `text-red-500`

  return <div className={`bg-black-800 px-10 py-10 text-xl ${textColor}`}>{message}</div>
}

export default Notification