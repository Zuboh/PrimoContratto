import { Slide1, Slide2, Slide3 } from '@/components/onboarding'
import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
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
      {/* Salta */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: spacing[6], paddingTop: spacing[2] }}>
        <Pressable onPress={navigate} hitSlop={12}>
          <Text style={{ fontSize: 14, fontFamily: 'Quicksand_600SemiBold', color: colors.muted }}>
            Salta
          </Text>
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

      {/* Dots + CTA */}
      <View style={{ paddingHorizontal: spacing[6], paddingBottom: insets.bottom + spacing[4], paddingTop: spacing[4], gap: spacing[4] }}>
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
        <Pressable
          onPress={goNext}
          style={{ backgroundColor: colors.primary, borderRadius: radius.full, paddingVertical: 14, alignItems: 'center' }}
        >
          <Text style={{ fontSize: 16, fontFamily: 'Quicksand_600SemiBold', color: colors.primaryForeground }}>
            {activeIndex === SLIDES.length - 1 ? 'Inizia' : 'Continua'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
