import { Feather } from '@expo/vector-icons'
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { QRCode } from '@/components/qrcode'
import { Badge } from '@/store/badge-store'
import { colors } from '@/styles/colors'

interface CredentialProps {
  data: Badge
  onChangeAvatar?: () => void
  onShowQRCode?: () => void
}

export function Credential({
  data,
  onChangeAvatar,
  onShowQRCode,
}: CredentialProps) {
  return (
    <View className="w-full self-stretch items-center">
      <Image
        source={require('@/assets/ticket/band.png')}
        alt=""
        className="w-24 h-52 z-10"
      />
      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
        <ImageBackground
          source={require('@/assets/ticket/header.png')}
          className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold">
              {data.eventTitle}
            </Text>
            <Text className="text-zinc-50 text-sm font-bold">#{data.id}</Text>
          </View>
        </ImageBackground>

        {data.image ? (
          <TouchableOpacity activeOpacity={0.7} onPress={onChangeAvatar}>
            <Image
              source={{ uri: data.image }}
              alt="Foto do usuário"
              className="w-36 h-36 rounded-full -mt-24 border-4 border-black"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-36 h-36 rounded-full -mt-24 border-4 border-black bg-gray-400 items-center justify-center"
            onPress={onChangeAvatar}
          >
            <Feather name="camera" size={32} color={colors.green[400]} />
          </TouchableOpacity>
        )}

        <Text className="font-bold text-2xl text-zinc-50 mt-4">
          {data.name}
        </Text>
        <Text className="font-regular text-base text-zinc-300 mb-4">
          {data.email}
        </Text>

        <QRCode size={120} value={data.checkInURL} />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-6"
          onPress={onShowQRCode}
        >
          <Text className="font-base text-orange-500 text-sm">
            Ampliar QRCode
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
