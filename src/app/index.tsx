import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Link, Redirect } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, StatusBar, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { api } from '@/lib/axios'
import { useBadgeStore } from '@/store/badge-store'
import { colors } from '@/styles/colors'

export default function Home() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { data, save } = useBadgeStore()

  async function handleAccessCredential() {
    if (!code.trim()) {
      Alert.alert('Ingresso inválido', 'Informe o código do ingresso')
    }

    try {
      setIsLoading(true)

      const { data } = await api.get(`/attendees/${code}/badge`)

      save(data)
    } catch (error) {
      console.log(error)
      Alert.alert('Ingresso', 'Não foi possível acessar a credencial')
    } finally {
      setIsLoading(false)
    }
  }

  if (data) {
    return <Redirect href="/ticket" />
  }

  return (
    <View className="bg-green-500 flex-1 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />

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
          <Input.Field
            placeholder="Código do ingresso"
            value={code}
            onChangeText={setCode}
          />
        </Input>

        <Button
          title="Acessar credencial"
          isLoading={isLoading}
          onPress={handleAccessCredential}
        />

        <Link
          href="/register"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  )
}
