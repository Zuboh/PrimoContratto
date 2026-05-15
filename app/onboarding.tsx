import { Slide1, Slide2, Slide3, WindLeaf, WindTrail } from '@/components/onboarding'
import { useTheme } from '@/hooks/useTheme'
import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
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

const { width: W, height: H } = Dimensions.get('window')

const SLIDES = [
  { id: '1', type: 'brand' as const },
  { id: '2', type: 'feature' as const },
  { id: '3', type: 'closer' as const },
]

const leafTop = H * 0.58
const leafLeft = W * 0.15

export default function OnboardingPreview() {
  const { colors, spacing, radius } = useTheme()
  const insets = useSafeAreaInsets()
  const [activeIndex, setActiveIndex] = useState(0)
  const [leafActive, setLeafActive] = useState(false)
  const listRef = useRef<FlatList>(null)

  const dismiss = () => router.back()

  const goNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      setLeafActive(true)
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
          <Text style={{ fontSize: 14, fontFamily: 'Quicksand_600SemiBold', color: colors.primary }}>
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

      {/* Wind animation — above FlatList, below controls */}
      <WindTrail active={leafActive} startTop={leafTop} startLeft={leafLeft} />
      <WindLeaf
        active={leafActive}
        startTop={leafTop}
        startLeft={leafLeft}
        onFinish={() => setLeafActive(false)}
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
