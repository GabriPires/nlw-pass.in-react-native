import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { Redirect } from 'expo-router'
import { MotiView } from 'moti'
import { useState } from 'react'
import {
  Alert,
  Modal,
  ScrollView,
  Share,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { Button } from '@/components/button'
import { Credential } from '@/components/credential'
import { Header } from '@/components/header'
import { QRCode } from '@/components/qrcode'
import { useBadgeStore } from '@/store/badge-store'
import { colors } from '@/styles/colors'
export default function Ticket() {
  const [showQRCode, setShowQRCode] = useState(false)

  const { data, remove, updateAvatar } = useBadgeStore()

  async function handleShare() {
    try {
      if (data?.checkInURL) {
        await Share.share({
          message: `Olá! Estou compartilhando minha credencial para o ${data.eventTitle}. Confira: ${data.checkInURL}`,
        })
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível compartilhar a credencial')
    }
  }

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      })

      if (result.assets) {
        updateAvatar(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!data) {
    return <Redirect href="/" />
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />

      <Header title="Minha credencial" />

      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential
          data={data}
          onChangeAvatar={handleSelectImage}
          onShowQRCode={() => setShowQRCode(true)}
        />

        <MotiView
          from={{
            translateY: 0,
          }}
          animate={{
            translateY: 10,
          }}
          transition={{
            loop: true,
            type: 'timing',
            duration: 700,
          }}
        >
          <FontAwesome
            name="angle-double-down"
            size={24}
            color={colors.gray[300]}
            className="self-center my-6"
          />
        </MotiView>

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do {data.eventTitle}!
        </Text>

        <Button title="Compartilhar" onPress={handleShare} />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-10 pb-4"
          onPress={remove}
        >
          <Text className="text-base text-white font-bold text-center">
            Remover ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showQRCode}
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setShowQRCode(false)}
      >
        <View className="flex-1 bg-green-500 items-center justify-center">
          <QRCode size={300} value={data.checkInURL} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowQRCode(false)}
          >
            <Text className="font-base text-orange-500 text-sm mt-10">
              Fechar QRCode
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}
