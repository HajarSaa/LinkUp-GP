import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const mockChannels = [
  {
    id: 1,
    name: "general",
    description: "General discussions and updates",
    topic: "Announcements and team updates",
    isPrivate: false,
    isActive: true,
    hasUnread: true,
    createdBy: "Ahmed",
    createdAt: "2025-03-01T10:00:00Z",
    pinnedMessages: [
      {
        id: 1,
        text: "Remember to submit your reports by Friday.",
        sender: "Hajar",
        timestamp: "2025-03-02T08:00:00Z",
      },
    ],
    members: [
      {
        id: 1,
        name: "Ahmed",
        role: "Admin",
        status: "Online",
        avatar: "/public/assets/avatars/ahmed.png",
      },
      {
        id: 2,
        name: "Omar",
        role: "Member",
        status: "Away",
        avatar: "/assets/avatars/omar.png",
      },
      {
        id: 3,
        name: "Alaa",
        role: "Member",
        status: "Offline",
        avatar: "/assets/avatars/alaa.png",
      },
    ],
    messages: [
      {
        id: 1,
        sender: "Ahmed",
        text: "Welcome to the general channel!",
        timestamp: "2025-03-10T10:00:00Z",
        editedAt: "2025-03-10T10:05:00Z",
        reactions: [
          { emoji: "👍", count: 3 },
          { emoji: "❤️", count: 1 },
        ],
        attachments: [
          {
            type: "image",
            url: "/assets/images/note.png",
          },
        ],
        thread: [
          {
            id: 1,
            sender: "Omar",
            text: "Thanks, Ahmed!",
            timestamp: "2025-03-04T10:05:00Z",
          },
          {
            id: 2,
            sender: "Ahmed",
            text: "You're welcome!",
            timestamp: "2025-03-04T10:05:15Z",
          },
          {
            id: 3,
            sender: "Ahmed",
            text: "You're welcome!",
            timestamp: "2025-03-04T10:05:15Z",
          },
          {
            id: 4,
            sender: "Ahmed",
            text: "You're welcome!",
            timestamp: "2025-03-04T10:05:15Z",
          },
          {
            id: 5,
            sender: "Ahmed",
            text: "You're welcome!",
            timestamp: "2025-03-04T10:05:15Z",
          },
        ],
      },
      {
        id: 2,
        sender: "Alaa",
        text: "Any updates on the project?",
        timestamp: "2025-03-04T11:00:00Z",
        reactions: [{ emoji: "🤔", count: 2 }],
        thread: [],
      },
      {
        id: 3,
        sender: "Alaa",
        text: "Any updates on the project?",
        timestamp: "2025-03-04T11:00:00Z",
        reactions: [{ emoji: "🤔", count: 2 }],
        thread: [],
      },
      {
        id: 4,
        sender: "Alaa",
        text: "Any updates on the project?",
        timestamp: "2025-03-04T11:00:00Z",
        reactions: [{ emoji: "🤔", count: 2 }],
        thread: [],
      },
    ],
  },
  {
    id: 2,
    name: "development",
    description: "Development-related discussions",
    topic: "Code reviews and best practices",
    isPrivate: true,
    createdBy: "Omar",
    createdAt: "2025-03-10T10:00:00Z",
    pinnedMessages: [],
    members: [
      {
        id: 1,
        name: "Ahmed",
        role: "Admin",
        status: "Online",
        avatar: "/assets/avatars/ahmed.png",
      },
      {
        id: 2,
        name: "Omar",
        role: "Member",
        status: "Do Not Disturb",
        avatar: "/assets/avatars/omar.png",
      },
    ],
    messages: [
      {
        id: 1,
        sender: "Omar",
        text: "Can someone review my PR?",
        timestamp: "2025-05-21T12:00:00Z",
        reactions: [],
        attachments: [
          {
            type: "file",
            url: "/assets/files/PR123.pdf",
            name: "PR123.pdf",
          },
        ],
        thread: [],
      },
    ],
  },
  {
    id: 3,
    name: "frontend",
    description: "Front End Project",
    topic: "Announcements and team updates",
    isPrivate: true,
    createdBy: "Ahmed",
    createdAt: "2025-03-01T10:00:00Z",
    pinnedMessages: [
      {
        id: 1,
        text: "Remember to submit your reports by Friday.",
        sender: "Hajar",
        timestamp: "2025-03-02T08:00:00Z",
      },
    ],
    members: [
      {
        id: 1,
        name: "Ahmed",
        role: "Admin",
        status: "Online",
        avatar: "/public/assets/avatars/ahmed.png",
      },
      {
        id: 2,
        name: "Omar",
        role: "Member",
        status: "Away",
        avatar: "/assets/avatars/omar.png",
      },
      {
        id: 3,
        name: "Alaa",
        role: "Member",
        status: "Offline",
        avatar: "/assets/avatars/alaa.png",
      },
    ],
    messages: [
      {
        id: 1,
        sender: "Ahmed",
        text: "Welcome to the general channel!",
        timestamp: "2025-03-10T10:00:00Z",
        editedAt: "2025-03-10T10:05:00Z",
        reactions: [
          { emoji: "👍", count: 3 },
          { emoji: "❤️", count: 1 },
        ],
        attachments: [
          {
            type: "image",
            url: "/assets/images/note.png",
          },
        ],
        thread: [
          {
            id: 1,
            sender: "Omar",
            text: "Thanks, Ahmed!",
            timestamp: "2025-03-04T10:05:00Z",
          },
          {
            id: 2,
            sender: "Ahmed",
            text: "You're welcome!",
            timestamp: "2025-03-04T10:05:15Z",
          },
          {
            id: 3,
            sender: "Ahmed",
            text: "You're welcome!",
            timestamp: "2025-03-04T10:05:15Z",
          },
          {
            id: 4,
            sender: "Ahmed",
            text: "You're welcome!",
            timestamp: "2025-03-04T10:05:15Z",
          },
          {
            id: 5,
            sender: "Ahmed",
            text: "You're welcome!",
            timestamp: "2025-03-04T10:05:15Z",
          },
        ],
      },
      {
        id: 2,
        sender: "Alaa",
        text: "Any updates on the project?",
        timestamp: "2025-03-04T11:00:00Z",
        reactions: [{ emoji: "🤔", count: 2 }],
        thread: [],
      },
      {
        id: 3,
        sender: "Alaa",
        text: "Any updates on the project?",
        timestamp: "2025-03-04T11:00:00Z",
        reactions: [{ emoji: "🤔", count: 2 }],
        thread: [],
      },
      {
        id: 4,
        sender: "Alaa",
        text: "Any updates on the project?",
        timestamp: "2025-03-04T11:00:00Z",
        reactions: [{ emoji: "🤔", count: 2 }],
        thread: [],
      },
    ],
  },
  {
    id: 4,
    name: "backend",
    description: "Back End Project",
    topic: "Announcements and team updates",
    isPrivate: true,
    createdBy: "Omar",
    createdAt: "2025-03-01T10:00:00Z",
    pinnedMessages: [
      {
        id: 1,
        text: "Remember to submit your reports by Friday.",
        sender: "Hajar",
        timestamp: "2025-03-02T08:00:00Z",
      },
    ],
    members: [
      {
        id: 1,
        name: "Ahmed",
        role: "Admin",
        status: "Online",
        avatar: "/public/assets/avatars/ahmed.png",
      },
      {
        id: 2,
        name: "Omar",
        role: "Member",
        status: "Away",
        avatar: "/assets/avatars/omar.png",
      },
      {
        id: 3,
        name: "Alaa",
        role: "Member",
        status: "Offline",
        avatar: "/assets/avatars/alaa.png",
      },
    ],
    messages: [
      {
        id: 1,
        sender: "Ahmed",
        text: "Welcome to the general channel!",
        timestamp: "2025-03-10T10:00:00Z",
        editedAt: "2025-03-10T10:05:00Z",
        reactions: [
          { emoji: "👍", count: 3 },
          { emoji: "❤️", count: 1 },
        ],
        attachments: [
          {
            type: "image",
            url: "/assets/images/note.png",
          },
        ],
        thread: [
          {
            id: 1,
            sender: "Omar",
            text: "Thanks, Ahmed!",
            timestamp: "2025-03-04T10:05:00Z",
          },
          {
            id: 2,
            sender: "Ahmed",
            text: "You're welcome!",
            timestamp: "2025-03-04T10:05:15Z",
          },
          {
            id: 3,
            sender: "Ahmed",
            text: "You're welcome!",
            timestamp: "2025-03-04T10:05:15Z",
          },
          {
            id: 4,
            sender: "Ahmed",
            text: "You're welcome!",
            timestamp: "2025-03-04T10:05:15Z",
          },
          {
            id: 5,
            sender: "Ahmed",
            text: "You're welcome!",
            timestamp: "2025-03-04T10:05:15Z",
          },
        ],
      },
      {
        id: 2,
        sender: "Alaa",
        text: "Any updates on the project?",
        timestamp: "2025-03-04T11:00:00Z",
        reactions: [{ emoji: "🤔", count: 2 }],
        thread: [],
      },
      {
        id: 3,
        sender: "Alaa",
        text: "Any updates on the project?",
        timestamp: "2025-03-04T11:00:00Z",
        reactions: [{ emoji: "🤔", count: 2 }],
        thread: [],
      },
      {
        id: 4,
        sender: "Alaa",
        text: "Any updates on the project?",
        timestamp: "2025-03-04T11:00:00Z",
        reactions: [{ emoji: "🤔", count: 2 }],
        thread: [],
      },
    ],
  },
];
// Mock API للـ Channels مؤقتًا
export const fetchChannels = createAsyncThunk(
  "channels/fetchChannels",
  async () => {
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve(mockChannels), 0)
    );
    return response;
  }
);

const channelsSlice = createSlice({
  name: "channels",
  initialState: { list: [], status: "idle" },
  reducers: {
    addChannel: (state, action) => {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      });
  },
});

export const { addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
