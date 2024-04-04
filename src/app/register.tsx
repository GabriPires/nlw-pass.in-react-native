import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import axios from 'axios'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, StatusBar, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { api } from '@/lib/axios'
import { useBadgeStore } from '@/store/badge-store'
import { colors } from '@/styles/colors'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { save } = useBadgeStore()

  async function handleRegister() {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Inscrição inválida', 'Preencha todos os campos')
    }

    try {
      setIsLoading(true)

      const response = await api.post(
        '/events/a747d00b-eef9-4290-9ac0-a94a16549083/attendees',
        {
          name,
          email,
        },
      )

      if (response.data.attendeeId) {
        const { data } = await api.get(
          `/attendees/${response.data.attendeeId}/badge`,
        )

        save(data.badge)

        Alert.alert('Inscrição', 'Inscrição realizada com sucesso!', [
          {
            text: 'Ok',
            onPress: () => router.push('/ticket'),
          },
        ])
      }
    } catch (error) {
      console.error(error)

      if (axios.isAxiosError(error)) {
        if (
          String(error.response?.data.message).includes('already registered')
        ) {
          return Alert.alert('Inscrição', 'Este e-mail já está cadastrado')
        }
      }

      Alert.alert(
        'Inscrição',
        'Não foi possível realizar a inscrição, tente novamente mais tarde',
      )
    } finally {
      setIsLoading(false)
    }
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
          <FontAwesome6
            name="user-circle"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
          />
        </Input>
        <Input>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="E-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </Input>

        <Button
          title="Realizar inscrição"
          onPress={handleRegister}
          isLoading={isLoading}
        />

        <Link
          href="/"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Já possui ingresso?
        </Link>
      </View>
    </View>
  )
}
