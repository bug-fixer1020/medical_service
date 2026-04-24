// server/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // আপনার Next.js অ্যাপের ঠিকানা
    methods: ["GET", "POST"]
  }
});

// কল ডাটা স্টোর করার জন্য (প্রোডাকশনে ডাটাবেস ব্যবহার করবেন)
const activeCalls = new Map();

io.on('connection', (socket) => {
  console.log('নতুন ইউজার সংযুক্ত:', socket.id);

  // রোগী কল শুরু করলে
  socket.on('start-call', ({ doctorId, patientId, patientName }) => {
    const callId = `${doctorId}_${patientId}_${Date.now()}`;
    
    activeCalls.set(callId, {
      doctorId,
      patientId,
      patientName,
      status: 'pending',
      socketId: socket.id
    });
    
    // ডাক্তারকে নোটিফাই করুন
    io.emit(`incoming-call-${doctorId}`, {
      callId,
      patientName,
      patientId
    });
    
    socket.emit('call-started', { callId });
  });

  // ডাক্তার কল একসেপ্ট করলে
  socket.on('accept-call', ({ callId, doctorName, doctorSocketId }) => {
    const call = activeCalls.get(callId);
    if (call) {
      call.status = 'accepted';
      call.doctorName = doctorName;
      call.doctorSocketId = socket.id;
      
      // রোগীকে জানান ডাক্তার জয়েন করছেন
      io.to(call.socketId).emit('call-accepted', {
        callId,
        doctorName
      });
    }
  });

  // WebRTC সিগন্যালিং (Offer/Answer/ICE)
  socket.on('webrtc-offer', ({ targetSocketId, offer }) => {
    io.to(targetSocketId).emit('webrtc-offer', {
      offer,
      fromSocketId: socket.id
    });
  });

  socket.on('webrtc-answer', ({ targetSocketId, answer }) => {
    io.to(targetSocketId).emit('webrtc-answer', {
      answer,
      fromSocketId: socket.id
    });
  });

  socket.on('ice-candidate', ({ targetSocketId, candidate }) => {
    io.to(targetSocketId).emit('ice-candidate', {
      candidate,
      fromSocketId: socket.id
    });
  });

  socket.on('disconnect', () => {
    console.log('ইউজার ডিসকানেক্ট:', socket.id);
  });
});

const PORT = process.env.SIGNALING_PORT || 3001;
server.listen(PORT, () => {
  console.log(`সিগন্যালিং সার্ভার চলছে পোর্ট ${PORT} এ`);
});