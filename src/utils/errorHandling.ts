// src/utils/errorHandling.ts
export const isApiLimitError = (error: any): boolean => {
  // Check for Spoonacular's specific error patterns
  if (error?.response?.status === 402) return true; // Payment Required
  if (error?.response?.status === 429) return true; // Too Many Requests
  
  // Check for error messages that might indicate quota issues
  const errorMessage = error?.response?.data?.message || error?.message || '';
  return errorMessage.toLowerCase().includes('quota') || 
         errorMessage.toLowerCase().includes('limit') ||
         errorMessage.toLowerCase().includes('daily points');
};