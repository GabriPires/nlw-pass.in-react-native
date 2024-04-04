import { StatusBar, View } from 'react-native'

import { Credential } from '@/components/credential'
import { Header } from '@/components/header'

export default function Ticket() {
  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />

      <Header title="Minha credencial" />

      <Credential />
    </View>
  )
}
