<img src="images/react-led-digit.gif" width="576" alt="react led digit" />

# React Seven-Segment Digit Component

Intended to use in digital clock or calculator.  
HTML and CSS only.  
→ [Codesandbox playground](https://codesandbox.io/p/sandbox/friendly-dewdney-7jvh5w)

Use example:

```tsx
import { Digit, BlinkingDigit } from 'react-led-digit';

<div className="digital-clock">
  <Digit value="0" />
  <Digit value="1" />
  <BlinkingDigit value=":" />
  <Digit value="2" />
  <Digit value="3" />
  <Digit value="am" />
</div>;
```
