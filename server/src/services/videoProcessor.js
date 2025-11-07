export const processVideo = async (filePath, filename, updateCallback) => {
    let progress = 0;

    const interval = setInterval(() => {
        progress += 20;
        if (progress >= 100) {
            clearInterval(interval);
            const classification = "safe";
            updateCallback(100, classification);
        } else {
            updateCallback(progress, null);
        }
    }, 1000);
};