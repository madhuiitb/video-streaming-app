import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import videoService from '../services/videoService';

export const uploadVideo = createAsyncThunk(
    'videos/upload',
    async (formData, thunkAPI) => {
        try {
            const res = await videoService.uploadVideo(formData);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const fetchVideos = createAsyncThunk(
    'videos/fetch',
    async (_, thunkAPI) => {
        try {
            const res = await videoService.getVideos();
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

const videoSlice = createSlice({
    name: 'videos',
    initialState: {
        items: [],
        uploadProgress: 0,
        status: 'idle',
        error: null,
    },
    reducers: {
        setUploadProgress: (state, action) => {
            state.uploadProgress = action.payload;
        },
        updateVideoStatus: (state, action) => {
            const { id, status } = action.payload;
            const video = state.items.find(v => v._id === id);
            if (video) video.status = status;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(uploadVideo.pending, state => {
                state.status = 'loading';
            })
            .addCase(uploadVideo.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.status = 'succeeded';
            })
            .addCase(uploadVideo.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            });
    },
});

export const { setUploadProgress, updateVideoStatus } = videoSlice.actions;
export default videoSlice.reducer;