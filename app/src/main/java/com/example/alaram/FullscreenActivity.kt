package com.example.alaram

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Button
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

class FullscreenActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            FullscreenUi(onStop = {
                // stop the foreground service
                stopService(android.content.Intent(this, AlarmForegroundService::class.java))
                finish()
            })
        }
    }
}

@Composable
fun FullscreenUi(onStop: () -> Unit) {
    Box(modifier = Modifier
        .fillMaxSize()
        .background(Brush.verticalGradient(listOf(Color(0xFFfc5c7d), Color(0xFF6a82fb)))), contentAlignment = Alignment.Center) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text("Alarm Ringing!", style = MaterialTheme.typography.h4, color = Color.White)
            Spacer(modifier = Modifier.height(20.dp))
            Button(onClick = onStop, modifier = Modifier.width(180.dp).height(56.dp), shape = RoundedCornerShape(28.dp)) {
                Text("Stop")
            }
        }
    }
}
