import { useSessionStore } from "@/entities/session/model/sessionStore"
import { useScreenContainerStyles } from "@/shared/constants/styles"
import { get, getDatabase, ref } from "@react-native-firebase/database"
import { StyleSheet, View } from "react-native"

export const HistoryScreen = () => {
  const styles = { ...useStyles(), container: useScreenContainerStyles() }
  const { firebaseUser } = useSessionStore(state => state)

  return (
    <View style={styles.container} onTouchEnd={async () => {
      const db = getDatabase()
      const querry = ref(db, `users/${firebaseUser?.uid}`)
      try {
        const snapshot = await get(querry)
        if (!snapshot.exists()) {
          console.log("нету такого блять")
        }
      } catch (err) {
        console.log(err)
      }
    }} />
  )
}

const useStyles = () => {

  return (
    StyleSheet.create({

    })
  )
}