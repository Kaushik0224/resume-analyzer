export const formatScore = (score) => {
    if (score >= 80) {
        return { colorClass: 'excellent', label: 'Excellent' };
    } else if (score >= 60) {
        return { colorClass: 'good', label: 'Good' };
    } else if (score >= 40) {
        return { colorClass: 'average', label: 'Fair' };
    } else {
        return { colorClass: 'poor', label: 'Needs Improvement' };
    }
};
