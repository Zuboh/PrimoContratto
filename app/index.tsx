import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
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

const navigate = () => router.replace('/(auth)/login')

export default function OnboardingScreen() {
  const { colors, spacing, radius } = useTheme()
  const insets = useSafeAreaInsets()
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<FlatList>(null)
  const { isLoggedIn } = useAuthStore()
  const { preview } = useLocalSearchParams<{ preview?: string }>()

  // Already logged in → skip onboarding (unless preview mode)
  useEffect(() => {
    if (isLoggedIn && !preview) router.replace('/(tabs)')
  }, [])

  const goNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      const next = activeIndex + 1
      listRef.current?.scrollToIndex({ index: next, animated: true })
      setActiveIndex(next)
    } else {
      navigate()
    }
  }

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / W)
    setActiveIndex(idx)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Salta — top right */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: spacing[6], paddingTop: spacing[2] }}>
        <Pressable onPress={navigate} hitSlop={12}>
          <Text style={{ fontSize: 14, fontFamily: 'Nunito_600SemiBold', color: colors.muted }}>
            Salta
          </Text>
        </Pressable>
      </View>

      {/* Slides */}
      <FlatList
        ref={listRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        onMomentumScrollEnd={onScrollEnd}
        onScrollToIndexFailed={() => {}}
        getItemLayout={(_, index) => ({ length: W, offset: W * index, index })}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        renderItem={({ item }) => {
          if (item.type === 'brand') return <Slide1 />
          if (item.type === 'feature') return <Slide2 />
          return <Slide3 />
        }}
      />

      {/* Bottom controls */}
      <View
        style={{
          paddingHorizontal: spacing[6],
          paddingBottom: insets.bottom + spacing[4],
          paddingTop: spacing[4],
          gap: spacing[4],
        }}
      >
        {/* Dots */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: spacing[2] }}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === activeIndex ? 20 : 8,
                height: 8,
                borderRadius: radius.full,
                backgroundColor: i === activeIndex ? colors.primary : colors.border,
              }}
            />
          ))}
        </View>

        {/* CTA */}
        <Pressable
          onPress={goNext}
          style={{
            backgroundColor: colors.primary,
            borderRadius: radius.full,
            paddingVertical: 14,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 16, fontFamily: 'Nunito_600SemiBold', color: colors.primaryForeground }}>
            Inizia
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

// ─── Slide 1: Brand intro ────────────────────────────────────────────────────

function Slide1() {
  const { colors, spacing } = useTheme()
  return (
    <View style={{ width: W, flex: 1, paddingHorizontal: 24 }}>
      {/* Wordmark */}
      <View style={{ alignItems: 'center', paddingTop: spacing[4] }}>
        <Image
          source={require('@/assets/images/logo-wordmark.png')}
          style={{ width: '90%', aspectRatio: 3 }}
          resizeMode="contain"
        />
      </View>

      {/* Panda */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={require('@/assets/images/panda-sitting.png')}
          style={{ width: W - 32, maxHeight: 340 }}
          resizeMode="contain"
        />
      </View>

      {/* Body text */}
      <View style={{ alignItems: 'center', paddingBottom: spacing[4] }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Nunito_400Regular',
            color: colors.muted,
            textAlign: 'center',
            lineHeight: 22,
            maxWidth: 260,
          }}
        >
          Un compagno tranquillo che ti aiuta a capire il tuo stipendio, ogni mese.
        </Text>
      </View>
    </View>
  )
}

// ─── Slide 2: Feature ────────────────────────────────────────────────────────

function Slide2() {
  const { colors, spacing, radius } = useTheme()
  return (
    <View style={{ width: W, flex: 1, paddingHorizontal: 24 }}>
      {/* Icon */}
      <View style={{ alignItems: 'center', paddingTop: spacing[5] }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: colors.sage100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 22 }}>🛡️</Text>
        </View>
      </View>

      {/* Headline */}
      <View style={{ alignItems: 'center', paddingTop: spacing[5], paddingBottom: spacing[3] }}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'Nunito_800ExtraBold',
            color: colors.foreground,
            textAlign: 'center',
            lineHeight: 30,
            letterSpacing: -0.22,
          }}
        >
          Capisci ogni voce della tua busta paga, senza stress.
        </Text>
      </View>

      {/* Subtitle */}
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'Nunito_400Regular',
          color: colors.muted,
          textAlign: 'center',
          lineHeight: 22,
        }}
      >
        Spieghiamo tutto in modo chiaro e semplice, per darti sempre trasparenza e fiducia.
      </Text>

      {/* Panda */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: spacing[2] }}>
        <Image
          source={require('@/assets/images/panda-lying.png')}
          style={{ width: W - 32, maxHeight: 260 }}
          resizeMode="contain"
        />
      </View>
    </View>
  )
}

// ─── Slide 3: Closer ─────────────────────────────────────────────────────────

function Slide3() {
  const { colors, spacing } = useTheme()
  return (
    <View style={{ width: W, flex: 1, paddingHorizontal: 24 }}>
      {/* Icon */}
      <View style={{ alignItems: 'center', paddingTop: spacing[5] }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: colors.sage100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 22 }}>🌿</Text>
        </View>
      </View>

      {/* Headline */}
      <View style={{ alignItems: 'center', paddingTop: spacing[5], paddingBottom: spacing[3] }}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'Nunito_800ExtraBold',
            color: colors.foreground,
            textAlign: 'center',
            lineHeight: 30,
            letterSpacing: -0.22,
          }}
        >
          Un compagno sereno, ogni mese.
        </Text>
      </View>

      {/* Subtitle */}
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'Nunito_400Regular',
          color: colors.muted,
          textAlign: 'center',
          lineHeight: 22,
        }}
      >
        Ti accompagniamo ogni mese con chiarezza e cura, perché capire il tuo stipendio non dovrebbe essere stressante.
      </Text>

      {/* Panda */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: spacing[2] }}>
        <Image
          source={require('@/assets/images/panda-leaf.png')}
          style={{ width: W - 32, maxHeight: 320 }}
          resizeMode="contain"
        />
      </View>
    </View>
  )
}
