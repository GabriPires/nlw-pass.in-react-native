import { Image, Text, View } from 'react-native'

export default function Home() {
  return (
    <View className="bg-green-500 flex-1 items-center justify-center">
      <Image
        source={require('@/assets/logo.png')}
        className="h-16"
        resizeMode="contain"
        alt="Logo"
      />

      <View></View>
    </View>
  )
}
