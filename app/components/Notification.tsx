"use client"

import { useNotification } from "./NotificationProvider"

const Notification = () => {
  const { message, type } = useNotification()

  if (!message) return null

  return <div>{message}</div>
}

export default Notification