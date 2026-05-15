import { LeafPhase, Slide1, Slide2, Slide3, WindLeaf, WindTrail } from '@/components/onboarding'
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

const { width: W, height: H } = Dimensions.get('window')

const SLIDES = [
  { id: '1', type: 'brand' as const },
  { id: '2', type: 'feature' as const },
  { id: '3', type: 'closer' as const },
]

const navigate = () => router.replace('/(auth)/login')

const TRAIL_STARTS: Record<string, { top: number; left: number }> = {
  'flying-2': { top: H * 0.185, left: W * 0.51 },
  'flying-3': { top: H * 0.17,  left: W * 0.78 },
}

export default function OnboardingScreen() {
  const { colors, spacing, radius } = useTheme()
  const insets = useSafeAreaInsets()
  const [activeIndex, setActiveIndex] = useState(0)
  const [leafPhase, setLeafPhase] = useState<LeafPhase>('hidden')
  const listRef = useRef<FlatList>(null)
  const { isLoggedIn } = useAuthStore()
  const { preview } = useLocalSearchParams<{ preview?: string }>()

  useEffect(() => {
    if (isLoggedIn && !preview) router.replace('/(tabs)')
  }, [])

  const goNext = () => {
    if (activeIndex === 0) {
      setLeafPhase('flying-2')
      listRef.current?.scrollToIndex({ index: 1, animated: true })
      setActiveIndex(1)
    } else if (activeIndex === 1) {
      setLeafPhase('flying-3')
      listRef.current?.scrollToIndex({ index: 2, animated: true })
      setActiveIndex(2)
    } else {
      setLeafPhase('done')
      navigate()
    }
  }

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / W)
    setActiveIndex(idx)
  }

  const isFlying = leafPhase === 'flying-2' || leafPhase === 'flying-3'
  const trailStart = TRAIL_STARTS[leafPhase] ?? TRAIL_STARTS['flying-2']

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

      {/* Leaf animation overlay */}
      <WindTrail active={isFlying} startTop={trailStart.top} startLeft={trailStart.left} />
      <WindLeaf
        phase={leafPhase}
        onLanded={() => {
          if (leafPhase === 'flying-2') setLeafPhase('resting-2')
          else if (leafPhase === 'flying-3') setLeafPhase('resting-3')
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
