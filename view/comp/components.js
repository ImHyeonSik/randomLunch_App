import React, {forwardRef} from 'react'
import {
    Animated,
    Image as ImgRN,
    SafeAreaView as Safe,
    StyleSheet,
    Text as P,
    Pressable as Press,
    View,
    RefreshControl,
    ScrollView as Scroll, Modal,
} from 'react-native'
import {Dim, Color, Style, t, Img} from "../../src/common";
import {font} from "../../src/constant";
import {KeyboardAwareScrollView as KeyboardAwareScroll} from "react-native-keyboard-aware-scroll-view";
import TextInputMask from 'react-native-text-input-mask';

export const SpeechBubble = props => {

}

export const ImageCard = props => {

}

export const Button = props => {
    const {
        width, height, style, viewStyle, onPress, disabled,
        textColor, text,
        ...others
    } = props;

    return (
        <Pressable
            style={[
                width && {width: Dim.x(width)},
                height && {height: Dim.y(height)},
                disabled ? Color.back('shadowCC') : Color.back('main'),
                css.buttonPressable,
                style,
            ]}
            viewStyle={[Style.center, css.full, viewStyle]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text
                color={disabled ? 'white' : textColor}
                {...others}
            >
                {text}
            </Text>
        </Pressable>
    )
}
Button.defaultProps = {
    textColor: 'mainDark',
    center: true,
    height: 48,
    width: '100%',
    size: 13,
    onPress: () => false,
};

export const Image = props => {
    const {
        containerStyle: style, viewStyle, onPress, hitSlop,
        ...others
    } = props;
    const pressableProps = {style, viewStyle, onPress, hitSlop}
    const img = <ImgRN {...others}/>;

    return onPress ? (
        <Pressable
            {...pressableProps}
        >
            {img}
        </Pressable>
    ) : img
}
Image.defaultProps = {
    resizeMode: 'contain'
}

export const BaseView = props => {
    const {
        children,
        statusBarBackColor, homeIndicatorBackColor, backgroundColor, style,
        onRefresh,
    } = props
    return <View style={{flex: 1}}>
        <Safe style={{flex: 0, backgroundColor: statusBarBackColor}}/>
        <Safe style={{flex: 1, backgroundColor: homeIndicatorBackColor}}>
            <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                onRefresh={onRefresh}
                keyboardShouldPersistTaps='handled'
            >
                <View style={[{flex: 1, backgroundColor}, style]}>
                    {children}
                </View>
            </ScrollView>
        </Safe>
    </View>;
}
BaseView.defaultProps = {
    statusBarBackColor: Color.white,
    homeIndicatorBackColor: Color.white,
    backgroundColor: Color.white,
    enableScroll: true,
}

export const KeyboardAwareScrollView = props => {
    const {children, contentContainerStyle, ...others} = props

    return (
        <KeyboardAwareScroll
            {...others}
            contentContainerStyle={[{flexGrow: 1}, contentContainerStyle]}
            keyboardShouldPersistTaps='handled'
            bounces={false}
        >
            {children}
        </KeyboardAwareScroll>
    )
}

export const MainLogo = props => {
    const {style} = props

    return (
        <View style={[style]}>
            <Image
                source={Img.logo}
                style={css.logo}
            />
            <Text
                style={css.greetingContainer}
                font={font.cafe}
                size={18}
                color={'mainDark'}
                center
            >
                {t.greeting}
            </Text>
        </View>
    )
}

export const ScrollView = props => {
    const {children, onRefresh, enableRefresh = typeof onRefresh === 'function', ...others} = props;
    return (
        <Scroll
            {...others}
            bounces={enableRefresh}
            refreshControl={enableRefresh === true
                ? <RefreshControl refreshing={false} onRefresh={onRefresh}/>
                : false
            }
        >
            {children}
        </Scroll>
    )
}

export const Text = props => {
    let {
        bold, center, children, clear, color, containerStyle, disabled, font, height, onPress,
        right, size, style,
        thin, viewStyle, maxSize = 1.5, ellipsis, ...others
    } = props;

    style = [{fontSize: Dim.x(size)}, style, font && {fontFamily: font}];
    containerStyle = [containerStyle];

    if (clear) style.push({backgroundColor: 'transparent'});
    if (disabled) {
        style = [{fontSize: Dim[`h${size}`]}, style, font && {fontFamily: font}];
        containerStyle = [containerStyle];
        style.push(Color.back('gray'));
        containerStyle.push(Color.back('gray'));
    }

    // color
    if (color) style.push({color: Color[color]});

    // weight
    if (bold) style.push({fontWeight: 'bold'});
    if (thin) style.push({fontFamily: font || 'Noto Sans CJK KR', fontWeight: '100'});

    // alignment
    if (center) style.push({textAlign: 'center', textAlignVertical: 'center', alignSelf: 'center'});
    if (right) style.push({textAlign: 'right'});

    if (ellipsis) {
        others.numberOfLines = 1;
        others.ellipsizeMode = 'tail';
    }

    others.style = style;
    return onPress !== undefined ? (
        <Pressable
            onPress={!disabled && onPress}
            style={containerStyle}
            viewStyle={viewStyle}
        >
            <P
                maxFontSizeMultiplier={maxSize}
                {...others}
            >
                {children}
            </P>
        </Pressable>
    ) : (
        <P
            maxFontSizeMultiplier={maxSize}
            onPress={onPress}
            {...others}
        >
            {children}
        </P>
    )
}
Text.defaultProps = {
    font: font.notoBold,
    size: 13,
}

export const TextInput = forwardRef((props, ref) =>
    (
        <TextInputMask
            {...props}
            ref={ref}
        />
    )
)

export const Pressable = props => {
    const {children, viewStyle, ...others} = props;

    const animated = new Animated.Value(1);
    const fadeIn = () => {
        Animated.timing(animated, {
            toValue: 0.5,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };
    const fadeOut = () => {
        Animated.timing(animated, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Press
            onPressIn={fadeIn} onPressOut={fadeOut}
            {...others}
        >
            <Animated.View style={[viewStyle, {opacity: animated}]}>
                {children}
            </Animated.View>
        </Press>)
}
Pressable.defaultProps = {
    onPress: () => false,
}

export const PopMenu = props => {
    const {
        children, visible = true, showLogo = true, onCloseImage, list,
        onClose, onRequestClose,
        renderItem, style, title, contents,
        scrollEnabled = true, scrollViewHeight
    } = props;

    return (
        <Modal transparent visible={visible} onRequestClose={onRequestClose}><Pressable disabled={true} onPress={onClose} style={[{flex: 1, backgroundColor: Color.overlay}, style || {justifyContent: 'center'}]}>
            <ScrollView scrollEnabled={scrollEnabled} contentContainerStyle={[{flexGrow: 1, alignItems: 'center'}]}><View style={css.popmenu}>
                {title !== undefined && <Text center size={15} style={{...Dim.padding(26,0,19)}} onPress={null} bold color="black">{title}</Text>}
                {contents !== undefined && <Text center style={{padding: 10}} color="main" onPress={null}>{contents}</Text>}
                {children}
            </View></ScrollView></Pressable>
        </Modal>
    )
}

const css = StyleSheet.create({
    logo: {
        ...Dim.size(120, 115),
        alignSelf: 'center',
    },
    greetingContainer: Dim.margin(15, 0, 0),
    full: {
        flex: 1,
    },
    buttonPressable: {
        borderRadius: 30,
        alignSelf: 'center',
    },
    popmenu: {
        width: Dim.x(312),
        height: Dim.y(194),
        backgroundColor: 'white',
        borderRadius: 16,
    }
});
