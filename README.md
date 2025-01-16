# React Native Select Option Bottom Sheet

[![npm version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)](https://www.npmjs.com/package/react-native-select-option-bottom-sheet)
[![Platform](https://img.shields.io/badge/platform-android%20%7C%20ios-green.svg)](https://github.com/yourusername/react-native-select-option-bottom-sheet)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A customizable React Native bottom sheet component for selecting options with support for both iOS and Android platforms. Features a clean UI, smooth animations, and flexible styling options.

## Features

- 🎨 Fully customizable styling
- 📱 Works on both iOS and Android
- 🔄 Supports controlled and uncontrolled modes
- 💫 Smooth animations
- 🎯 TypeScript support
- 🌈 Theme context integration
- ✏️ Custom font support
- 📐 Responsive design

## Installation
> copy code from file of `SelectOptionBottomSheet.tsx` and paste it into your react native project inside `component/ui` folder and use anywhere.

for this 
>import { heightPercentageToDP } from '@utils/responsive-screen';

you can try npm install react-native-responsive-screen --save


### Dependencies

This component requires the following dependencies:

```bash
yarn add react-native-raw-bottom-sheet
yarn add react-native-responsive-fontsize
yarn add install react-native-responsive-screen
yarn add react-native-reanimated
```

## Usage

### Basic Usage

```typescript
import SelectOptionBottomSheet from 'react-native-select-option-bottom-sheet';

const MyComponent = () => {
  const options = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <SelectOptionBottomSheet
      options={options}
      selectedOption={selected}
      onSelect={(option) => setSelected(option)}
      placeholder="Select an option"
      label="Choose your option"
    />
  );
};
```

### With Initial Selected Value

```typescript
// Using object
const InitialSelected = { id: 2, name: 'Option 2' };

// Using just ID
const InitialSelectedId = 2;

<SelectOptionBottomSheet
  options={options}
  selectedOption={InitialSelected} // or InitialSelectedId
  onSelect={(option) => setSelected(option)}
  placeholder="Select an option"
  label="Choose your option"
/>
```

### Custom Styling

```typescript
<SelectOptionBottomSheet
  options={options}
  selectedOption={selected}
  onSelect={(option) => setSelected(option)}
  placeholder="Select an option"
  label="Choose your option"
  parentStyle={{
    marginHorizontal: 20,
  }}
  buttonStyle={{
    borderRadius: 8,
    borderColor: '#007AFF',
  }}
  textStyle={{
    fontSize: 16,
    fontWeight: '500',
  }}
  labelStyle={{
    fontSize: 14,
    color: '#666',
  }}
  optionStyle={{
    borderBottomWidth: 0,
  }}
  optionTextStyle={{
    fontSize: 16,
  }}
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| options | Option[] | Yes | - | Array of options to display |
| selectedOption | Option \| number \| string \| null | Yes | - | Currently selected option or ID |
| onSelect | (option: Option) => void | Yes | - | Callback when option is selected |
| placeholder | string | Yes | - | Text to show when no option is selected |
| label | string | Yes | - | Label text above the selector |
| displayKey | keyof Option | No | 'name' | Key to display from option object |
| parentStyle | ViewStyle | No | - | Style for the container |
| buttonStyle | ViewStyle | No | - | Style for the selector button |
| textStyle | TextStyle | No | - | Style for the selector text |
| labelStyle | TextStyle | No | - | Style for the label text |
| optionTextStyle | TextStyle | No | - | Style for the option text |
| optionStyle | ViewStyle | No | - | Style for the option container |

## Option Interface

```typescript
interface Option {
    id: number | string;
    name: string;
    [key: string]: any;
}
```

## Theme Support
we uses here our theming for color, you can modify it.

The component supports theme context with the following properties:

- `typograpyColor`: Color for typography
- `muteColor`: Color for muted elements
- `primary`: Primary color for selected states
- `secondary`: Secondary color for UI elements

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
