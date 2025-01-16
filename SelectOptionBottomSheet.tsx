import React, { useRef, useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
    TextStyle,
    ScrollView,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { heightPercentageToDP } from '@utils/responsive-screen';
import ThemeContext from '@theme/ThemeContext';
import Animated from 'react-native-reanimated';

interface Option {
    id: number | string;
    name: string;
    [key: string]: any;
}

interface SelectOptionBottomSheetProps {
    options: Option[];
    selectedOption: Option | number | string | null; // Modified to accept id directly
    onSelect: (option: Option) => void;
    placeholder: string;
    label: string;
    displayKey?: keyof Option;
    parentStyle?: ViewStyle;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
    labelStyle?: TextStyle;
    optionTextStyle?: TextStyle;
    optionStyle?: ViewStyle;
}

const SelectOptionBottomSheet: React.FC<SelectOptionBottomSheetProps> = ({
    options,
    selectedOption,
    onSelect,
    placeholder,
    label,
    displayKey = 'name',
    parentStyle,
    buttonStyle,
    textStyle,
    labelStyle,
    optionTextStyle,
    optionStyle,
}) => {
    const refRBSheet = useRef<any>(null);
    const theme = useContext(ThemeContext);
    const [selected, setSelected] = useState<Option | null>(null);

    // Effect to handle the selected option initialization and updates
    useEffect(() => {
        if (selectedOption !== null) {
            // If selectedOption is an object with an id
            if (typeof selectedOption === 'object' && selectedOption.id !== undefined) {
                setSelected(selectedOption as Option);
            }
            // If selectedOption is just an id (number or string)
            else {
                const foundOption = options.find(
                    opt => opt.id === selectedOption || opt.id === Number(selectedOption)
                );
                if (foundOption) {
                    setSelected(foundOption);
                }
            }
        } else {
            setSelected(null);
        }
    }, [selectedOption, options]);

    const handleSelect = (option: Option) => {
        setSelected(option);
        onSelect(option);
        refRBSheet.current?.close();
    };

    return (
        <Animated.View style={[styles.centeredContainer, parentStyle]}>
            {label && (
                <Text
                    style={[
                        styles.label,
                        { color: theme?.typograpyColor },
                        labelStyle,
                    ]}
                >
                    {label}
                </Text>
            )}
            <TouchableOpacity
                style={[
                    styles.selector,
                    { borderColor: theme?.muteColor },
                    buttonStyle,
                ]}
                onPress={() => refRBSheet.current?.open()}
            >
                <Text
                    style={[
                        styles.selectorText,
                        {
                            color: selected
                                ? theme?.primary
                                : theme?.muteColor,
                        },
                        textStyle,
                    ]}
                >
                    {selected
                        ? (selected[displayKey] as string)
                        : placeholder}
                </Text>
            </TouchableOpacity>

            <RBSheet
                customModalProps={{
                    statusBarTranslucent: true,
                }}
                draggable={true}
                dragOnContent={true}
                ref={refRBSheet}
                closeOnPressMask={true}
                height={300}
                customStyles={{
                    wrapper: { backgroundColor: 'rgba(0,0,0,0.5)' },
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                    draggableIcon: { backgroundColor: theme?.secondary },
                }}
            >
                <ScrollView
                    style={styles.bottomSheetContent}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            style={[
                                styles.option,
                                {
                                    backgroundColor:
                                        selected?.id === option.id
                                            ? `${theme?.primary}20`
                                            : 'transparent',
                                },
                                optionStyle,
                            ]}
                            onPress={() => handleSelect(option)}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    {
                                        color:
                                            selected?.id === option.id
                                                ? theme?.primary
                                                : theme?.typograpyColor,
                                    },
                                    optionTextStyle,
                                ]}
                            >
                                {option[displayKey] as string}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </RBSheet>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    centeredContainer: {
        flex: 1,
    },
    label: {
        marginBottom: heightPercentageToDP(0.2),
        fontSize: RFPercentage(1.95),
        fontFamily: 'Ubuntu-Medium',
        paddingLeft: heightPercentageToDP(0.1),
    },
    selector: {
        borderWidth: 1,
        borderRadius: 10,
        padding: heightPercentageToDP(2),
        marginBottom: heightPercentageToDP(2),
    },
    selectorText: {
        fontSize: RFPercentage(2),
        fontFamily: 'Ubuntu-Regular',
    },
    bottomSheetContent: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: heightPercentageToDP(1),
        paddingVertical: heightPercentageToDP(2),
    },
    option: {
        padding: heightPercentageToDP(2),
        borderBottomWidth: 1,
        borderBottomColor: '#ECECEC',
        borderRadius: 10,
    },
    optionText: {
        fontSize: RFPercentage(2.2),
        fontFamily: 'Ubuntu-Regular',
    },
});

export default SelectOptionBottomSheet;