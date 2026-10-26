"use client"

import { useNotification } from "./NotificationProvider"

const Notification = () => {
  const { message, type } = useNotification()

  if (!message) return null

  const notificationColor = type === "success" ? `bg-emerald-500` : `bg-red-400`

  return (
    <div
      data-testid="notification"
      className={`${notificationColor} text-white font-bold px-3 py-3 text-xl m-auto mt-10 w-75 rounded flex justify-center`}
    >
      {message}
    </div>
  )
}

export default Notification