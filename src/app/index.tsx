import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Image, View } from 'react-native'

import { Input } from '@/components/input'
import { colors } from '@/styles/colors'

export default function Home() {
  return (
    <View className="bg-green-500 flex-1 items-center justify-center p-8">
      <Image
        source={require('@/assets/logo.png')}
        className="h-16"
        resizeMode="contain"
        alt="Logo"
      />

      <View className="w-full mt-12 gap-3">
        <Input>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field placeholder="Código do ingresso" />
        </Input>
      </View>
    </View>
  )
}
