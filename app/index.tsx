import { IllustrationPlaceholder } from '@/components/ui/IllustrationPlaceholder'
import { useTheme } from '@/hooks/useTheme'
import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SLIDES = [
  {
    id: '1',
    headline: 'Carica il cedolino',
    subtitle: 'Basta una foto o un PDF',
  },
  {
    id: '2',
    headline: 'Analisi in 30 secondi',
    subtitle: "L'AI legge tutto per te",
  },
  {
    id: '3',
    headline: 'Capisce ogni voce',
    subtitle: 'Lordo, netto, detrazioni — tutto chiaro',
  },
]

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function OnboardingScreen() {
  const { colors, typography, spacing, radius, fontFamily } = useTheme()
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<FlatList>(null)

  const isLast = activeIndex === SLIDES.length - 1

  const goNext = () => {
    if (isLast) {
      router.replace('/(tabs)')
      return
    }
    const next = activeIndex + 1
    listRef.current?.scrollToIndex({ index: next, animated: true })
    setActiveIndex(next)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        onScrollToIndexFailed={() => {}}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              width: SCREEN_WIDTH,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: spacing[6],
              gap: spacing[6],
            }}
          >
            <IllustrationPlaceholder size="lg" />
            <View style={{ gap: spacing[2], alignItems: 'center' }}>
              <Text
                style={[
                  typography.h1,
                  { color: colors.foreground, textAlign: 'center' },
                ]}
              >
                {item.headline}
              </Text>
              <Text
                style={[
                  typography.bodyLg,
                  { color: colors.muted, textAlign: 'center' },
                ]}
              >
                {item.subtitle}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Bottom controls */}
      <View
        style={{
          paddingHorizontal: spacing[6],
          paddingBottom: spacing[8],
          gap: spacing[5],
        }}
      >
        {/* Dot pagination */}
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

        {/* CTA button */}
        <Pressable
          onPress={goNext}
          style={{
            backgroundColor: colors.primary,
            borderRadius: radius.full,
            paddingVertical: spacing[4],
            alignItems: 'center',
          }}
        >
          <Text style={{ fontFamily: fontFamily.semiBold, fontSize: 14, color: colors.primaryForeground }}>
            {isLast ? 'Inizia' : 'Avanti →'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
