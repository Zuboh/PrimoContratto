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
  View,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

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
          <Text style={{ fontSize: 14, fontFamily: 'Nunito_600SemiBold', color: colors.muted }}>Salta</Text>
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
          <Text style={{ fontSize: 16, fontFamily: 'Nunito_600SemiBold', color: colors.primaryForeground }}>Inizia</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

function Slide1() {
  const { colors, spacing } = useTheme()
  return (
    <View style={{ width: W, flex: 1, paddingHorizontal: 24 }}>
      <View style={{ alignItems: 'center', paddingTop: spacing[4] }}>
        <Image source={require('@/assets/images/logo-wordmark.png')} style={{ width: '60%', aspectRatio: 3 }} resizeMode="contain" />
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('@/assets/images/panda-sitting.png')} style={{ width: W - 32, maxHeight: 340 }} resizeMode="contain" />
      </View>
      <View style={{ alignItems: 'center', paddingBottom: spacing[4] }}>
        <Text style={{ fontSize: 14, fontFamily: 'Nunito_400Regular', color: colors.muted, textAlign: 'center', lineHeight: 22, maxWidth: 260 }}>
          Un compagno tranquillo che ti aiuta a capire il tuo stipendio, ogni mese.
        </Text>
      </View>
    </View>
  )
}

function Slide2() {
  const { colors, spacing } = useTheme()
  return (
    <View style={{ width: W, flex: 1, paddingHorizontal: 24 }}>
      <View style={{ alignItems: 'center', paddingTop: spacing[5] }}>
        <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.sage100, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 22 }}>🛡️</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', paddingTop: spacing[5], paddingBottom: spacing[3] }}>
        <Text style={{ fontSize: 22, fontFamily: 'Nunito_800ExtraBold', color: colors.foreground, textAlign: 'center', lineHeight: 30, letterSpacing: -0.22 }}>
          Capisci ogni voce della tua busta paga, senza stress.
        </Text>
      </View>
      <Text style={{ fontSize: 14, fontFamily: 'Nunito_400Regular', color: colors.muted, textAlign: 'center', lineHeight: 22 }}>
        Spieghiamo tutto in modo chiaro e semplice, per darti sempre trasparenza e fiducia.
      </Text>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: spacing[2] }}>
        <Image source={require('@/assets/images/panda-lying.png')} style={{ width: W - 32, maxHeight: 260 }} resizeMode="contain" />
      </View>
    </View>
  )
}

function Slide3() {
  const { colors, spacing } = useTheme()
  return (
    <View style={{ width: W, flex: 1, paddingHorizontal: 24 }}>
      <View style={{ alignItems: 'center', paddingTop: spacing[5] }}>
        <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.sage100, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 22 }}>🌿</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', paddingTop: spacing[5], paddingBottom: spacing[3] }}>
        <Text style={{ fontSize: 22, fontFamily: 'Nunito_800ExtraBold', color: colors.foreground, textAlign: 'center', lineHeight: 30, letterSpacing: -0.22 }}>
          Un compagno sereno, ogni mese.
        </Text>
      </View>
      <Text style={{ fontSize: 14, fontFamily: 'Nunito_400Regular', color: colors.muted, textAlign: 'center', lineHeight: 22 }}>
        Ti accompagniamo ogni mese con chiarezza e cura, perché capire il tuo stipendio non dovrebbe essere stressante.
      </Text>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: spacing[2] }}>
        <Image source={require('@/assets/images/panda-leaf.png')} style={{ width: W - 32, maxHeight: 320 }} resizeMode="contain" />
      </View>
    </View>
  )
}
