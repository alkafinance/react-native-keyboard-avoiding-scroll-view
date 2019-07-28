// @ts-ignore: internal module
import TextInputState from 'react-native/Libraries/Components/TextInput/TextInputState';

export function hijackTextInputEvents({
  onFocusTextInput,
  onBlurTextInput,
}: {
  onFocusTextInput?: (focusedTextInputId: number) => void;
  onBlurTextInput?: (focusedTextInputId: number) => void;
}) {
  const originalFocusTextInput = TextInputState.focusTextInput.bind(
    TextInputState,
  );
  const originalBlurTextInput = TextInputState.blurTextInput.bind(
    TextInputState,
  );

  let currentlyFocusedTextInputId: number | null = null;

  TextInputState.focusTextInput = (focusedTextInputId: number | null) => {
    originalFocusTextInput(focusedTextInputId);

    if (
      currentlyFocusedTextInputId !== focusedTextInputId &&
      focusedTextInputId !== null
    ) {
      currentlyFocusedTextInputId = focusedTextInputId;
      if (onFocusTextInput) onFocusTextInput(focusedTextInputId);
    }
  };

  TextInputState.blurTextInput = (focusedTextInputId: number | null) => {
    originalBlurTextInput(focusedTextInputId);

    if (
      currentlyFocusedTextInputId === focusedTextInputId &&
      focusedTextInputId !== null
    ) {
      currentlyFocusedTextInputId = null;
      if (onBlurTextInput) onBlurTextInput(focusedTextInputId);
    }
  };

  return {
    remove: () => {
      TextInputState.focusTextInput = originalFocusTextInput;
      TextInputState.blurTextInput = originalBlurTextInput;
    },
  };
}
