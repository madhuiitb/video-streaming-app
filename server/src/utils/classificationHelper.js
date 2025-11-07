export const classifyVideo = () => {
    const isFlagged = Math.random() > 0.7;
    return isFlagged ? 'flagged' : 'safe';
};