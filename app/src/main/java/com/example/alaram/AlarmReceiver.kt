package com.example.alaram

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

class AlarmReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent?) {
        // Start foreground service which will post a full-screen notification
        val svc = Intent(context, AlarmForegroundService::class.java)
        svc.putExtra("triggeredAt", System.currentTimeMillis())
        context.startForegroundService(svc)
    }
}
