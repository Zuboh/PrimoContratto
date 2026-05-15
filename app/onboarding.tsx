import { duration } from '@/constants/motion'
import { useTheme } from '@/hooks/useTheme'
import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const STAGGER_MS = 800

const enterStaggered = (index: number) =>
  FadeInDown.duration(duration.base).delay(index * STAGGER_MS)

const { width: W } = Dimensions.get('window')

const SLIDES = [
  { id: '1', type: 'brand' as const },
  { id: '2', type: 'feature' as const },
  { id: '3', type: 'closer' as const },
]

export default function OnboardingPreview() {
  const { colors, spacing, radius } = useTheme()
  const insets = useSafeAreaInsets()
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<FlatList>(null)

  const dismiss = () => router.back()

  const goNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      const next = activeIndex + 1
      listRef.current?.scrollToIndex({ index: next, animated: true })
      setActiveIndex(next)
    } else {
      dismiss()
    }
  }

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / W)
    setActiveIndex(idx)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Salta */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: spacing[6], paddingTop: spacing[2] }}>
        <Pressable onPress={dismiss} hitSlop={12}>
          <Text style={{ fontSize: 14, fontFamily: 'Quicksand_600SemiBold', color: colors.primary }}>Salta</Text>
        </Pressable>
      </View>

      <FlatList
        ref={listRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        onScrollToIndexFailed={() => {}}
        getItemLayout={(_, i) => ({ length: W, offset: W * i, index: i })}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        renderItem={({ item }) => {
          if (item.type === 'brand') return <Slide1 />
          if (item.type === 'feature') return <Slide2 />
          return <Slide3 />
        }}
      />

      <View style={{ paddingHorizontal: spacing[6], paddingBottom: insets.bottom + spacing[4], paddingTop: spacing[4], gap: spacing[4] }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: spacing[2] }}>
          {SLIDES.map((_, i) => (
            <View key={i} style={{ width: i === activeIndex ? 20 : 8, height: 8, borderRadius: radius.full, backgroundColor: i === activeIndex ? colors.primary : colors.border }} />
          ))}
        </View>
        <Pressable onPress={goNext} style={{ backgroundColor: colors.primary, borderRadius: radius.full, paddingVertical: 14, alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontFamily: 'Quicksand_600SemiBold', color: colors.primaryForeground }}>Inizia</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

function Slide1() {
  const { colors } = useTheme()
  const { width, height } = useWindowDimensions()

  const isSmallScreen = height < 760

  const logoWidth = width * 0.68
  const logoHeight = logoWidth * 0.34

  const pandaWidth = width * 0.92
  const pandaHeight = isSmallScreen ? 220 : 260

  return (
    <View
      style={{
        width,
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          marginTop: isSmallScreen ? 70 : 110,
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Animated.View entering={enterStaggered(0)}>
          <Image
            source={require('@/assets/images/logo-wordmark.png')}
            style={{
              width: logoWidth,
              height: logoHeight,
            }}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View entering={enterStaggered(1)}>
          <Text
            style={{
              fontSize: isSmallScreen ? 16 : 17,
              fontFamily: 'Quicksand_400Regular',
              color: colors.primary,
              textAlign: 'center',
              marginTop: 8,
            }}
          >
            Il tuo stipendio, spiegato bene.
          </Text>
        </Animated.View>
      </View>

      <Animated.View
        entering={enterStaggered(2)}
        style={{
          marginTop: isSmallScreen ? 70 : 100,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Image
          source={require('@/assets/images/panda-sitting.png')}
          style={{
            width: pandaWidth,
            height: pandaHeight,
          }}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View entering={enterStaggered(2)}>
        <Text
          style={{
            fontSize: isSmallScreen ? 14 : 15,
            fontFamily: 'Quicksand_400Regular',
            color: colors.muted,
            textAlign: 'center',
            lineHeight: isSmallScreen ? 21 : 23,
            maxWidth: 280,
            marginTop: isSmallScreen ? 18 : 28,
            flexShrink: 0,
          }}
        >
          Un compagno tranquillo che ti aiuta a capire il tuo stipendio, ogni mese.
        </Text>
      </Animated.View>
    </View>
  )
}

function Slide2() {
  const { colors } = useTheme()

  const { width, height } = useWindowDimensions()

  const isSmallScreen = height < 760

  const pandaWidth = width * 0.92
  const pandaHeight = isSmallScreen ? 220 : 260

  return (
    <View
      style={{
        width: W,
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
      }}
    >
      {/* Title */}
      <Text
        style={{
          marginTop: 150,
          fontSize: 27,
          fontFamily: 'Quicksand_600SemiBold',
          color: colors.foreground,
          textAlign: 'center',
          lineHeight: 38,
          letterSpacing: -0.4,
          maxWidth: 320,
        }}
      >
        Capisci ogni voce{'\n'}
        della tua busta paga,{'\n'}
        senza stress.
      </Text>

      {/* Description */}
      <Text
        style={{
          marginTop: 22,
          fontSize: 15,
          fontFamily: 'Quicksand_400Regular',
          color: colors.foreground,
          textAlign: 'center',
          lineHeight: 23,
          maxWidth: 285,
        }}
      >
        Spieghiamo tutto in modo chiaro{'\n'}
        e semplice, per darti sempre{'\n'}
        trasparenza e fiducia.
      </Text>

      {/* Panda */}
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Image
          source={require('@/assets/images/panda-lying.png')}
          style={{
            width: pandaWidth,
            height: pandaHeight,
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  )
}

function Slide3() {
  const { colors } = useTheme()

    const { width, height } = useWindowDimensions()

  const isSmallScreen = height < 760

  const pandaWidth = width * 0.92
  const pandaHeight = isSmallScreen ? 220 : 260

  return (
    <View
      style={{
        width: W,
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
      }}
    >

      {/* Title */}
      <Text
        style={{
          marginTop: 150,
          fontSize: 27,
          fontFamily: 'Quicksand_600SemiBold',
          color: colors.foreground,
          textAlign: 'center',
          lineHeight: 38,
          letterSpacing: -0.4,
          maxWidth: 320,
        }}
      >
        Un compagno sereno,{'\n'}
        ogni mese.
      </Text>

      {/* Description */}
      <Text
        style={{
          marginTop: 22,
          fontSize: 15,
          fontFamily: 'Quicksand_400Regular',
          color: colors.foreground,
          textAlign: 'center',
          lineHeight: 23,
          maxWidth: 300,
        }}
      >
        Ti accompagniamo con chiarezza{'\n'}
        e cura, perché capire il tuo{'\n'}
        stipendio non dovrebbe essere{'\n'}
        stressante.
      </Text>

      {/* Panda */}
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Image
          source={require('@/assets/images/panda-leaf.png')}
          style={{
            width: pandaWidth,
            height: pandaHeight,
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  )
}
