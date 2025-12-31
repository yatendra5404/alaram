package com.example.alaram

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build

object NotificationHelper {
    const val CH_ID = "alarm_channel"
    const val NOTIF_ID = 1001

    fun createAlarmNotification(context: Context): Notification {
        val nm = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val ch = NotificationChannel(CH_ID, "Alaram channel", NotificationManager.IMPORTANCE_HIGH)
            ch.setShowBadge(true)
            ch.importance = NotificationManager.IMPORTANCE_HIGH
            nm.createNotificationChannel(ch)
        }

        val fullScreen = Intent(context, FullscreenActivity::class.java)
        fullScreen.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        val fullScreenPI = PendingIntent.getActivity(context, 0, fullScreen, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)

        val builder = android.app.Notification.Builder(context, CH_ID)
            .setContentTitle("Alarm")
            .setContentText("Time to wake up")
            .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
            .setPriority(android.app.Notification.PRIORITY_HIGH)
            .setFullScreenIntent(fullScreenPI, true)

        return builder.build()
    }
}
