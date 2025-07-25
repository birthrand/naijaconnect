import { useRef, useState } from 'react';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Animated } from 'react-native';

export const useSwipeGesture = (onSwipeRight) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    const { state, translationX } = event.nativeEvent;

    if (state === State.END) {
      // Check if swipe was right and significant enough
      if (translationX > 50 && !isSidebarOpen) {
        // Swipe right detected - open sidebar
        setIsSidebarOpen(true);
        onSwipeRight();
      }
      
      // Reset the translation
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  return {
    translateX,
    onGestureEvent,
    onHandlerStateChange,
    isSidebarOpen,
    setIsSidebarOpen,
  };
}; 