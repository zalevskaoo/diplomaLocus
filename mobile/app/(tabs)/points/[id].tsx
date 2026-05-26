import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { getCategoryEmoji, getCategoryLabel } from '@/constants/categories';
import { useAuth } from '@/context/AuthContext';
import { createReview, getPoints, getReviews } from '@/services/api';
import { profileStyles as styles } from '@/styles/profileStyles';

type Author = {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  bio?: string;
};

type Point = {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  address: string;
  description?: string;
  imageUrls?: string[];
  author?: Author | null;
};

type Review = {
  _id?: string;
  id?: string;
  text: string;
  imageUrls?: string[];
  createdAt?: string;
  author?: Author | null;
};

export default function PointDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { token } = useAuth();

  const [point, setPoint] = useState<Point | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewText, setReviewText] = useState('');
  const [reviewImages, setReviewImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadReviews(pointId: string) {
    const data = await getReviews(pointId);
    setReviews(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    async function loadPoint() {
      try {
        const data = await getPoints();

        const foundPoint = data.find((item: Point) => {
          const pointId = item._id ?? item.id;
          return pointId === id;
        });

        setPoint(foundPoint ?? null);

        if (id) {
          await loadReviews(id);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadPoint();
  }, [id]);

  async function pickReviewImages() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Помилка', 'Потрібен доступ до галереї');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 0.8,
    });

    if (result.canceled) return;

    setReviewImages(result.assets.slice(0, 5));
  }

  async function handleCreateReview() {
    if (!token || !id) {
      Alert.alert('Помилка', 'Спочатку увійдіть в акаунт');
      return;
    }

    if (!reviewText.trim()) {
      Alert.alert('Помилка', 'Напишіть текст відгуку');
      return;
    }

    try {
      await createReview(token, id, reviewText.trim(), reviewImages);

      setReviewText('');
      setReviewImages([]);

      await loadReviews(id);

      Alert.alert('Успіх', 'Відгук додано');
    } catch (error) {
      console.log(error);
      Alert.alert('Помилка', 'Не вдалося додати відгук');
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#233449" />
      </View>
    );
  }

  if (!point) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Точку не знайдено</Text>

        <Pressable
          style={styles.backButton}
          onPress={() => router.push('/map' as any)}
        >
          <Text style={styles.backButtonText}>Назад до мапи</Text>
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>
        {getCategoryEmoji(point.category)} {point.title}
      </Text>

      <View style={styles.profileCard}>
        <Text style={styles.label}>Категорія</Text>
        <Text style={styles.description}>{getCategoryLabel(point.category)}</Text>

        <Text style={styles.label}>Адреса</Text>
        <Text style={styles.description}>{point.address}</Text>

        <Text style={styles.label}>Опис</Text>
        <Text style={styles.description}>
          {point.description || 'Опис відсутній'}
        </Text>

        <Text style={styles.label}>Автор</Text>

        {point.author ? (
          <Pressable
            style={styles.reviewAuthorRow}
            onPress={() => router.push(`/users/${point.author?.id}` as any)}
          >
            {point.author.avatarUrl ? (
              <Image
                source={{ uri: point.author.avatarUrl }}
                style={styles.reviewAvatar}
              />
            ) : (
              <View style={styles.reviewEmptyAvatar}>
  <Image
    source={require('@/assets/images/locus_av.jpg')}
    style={styles.defaultReviewAvatarImage}
  />
</View>
            )}

            <Text style={styles.authorLink}>{point.author.name}</Text>
          </Pressable>
        ) : (
          <Text style={styles.description}>Невідомо</Text>
        )}
      </View>

      <View style={styles.profileCard}>
        <Text style={styles.label}>Фото</Text>

        {point.imageUrls && point.imageUrls.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photoRow}
          >
            {point.imageUrls.map((url) => (
              <Image
                key={url}
                source={{ uri: url }}
                style={styles.horizontalImage}
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.description}>Фото поки не додано</Text>
        )}
      </View>

      <View style={styles.profileCard}>
        <Text style={styles.label}>Відгуки</Text>

        {reviews.length === 0 ? (
          <Text style={styles.description}>Відгуків поки немає</Text>
        ) : (
          reviews.map((review) => (
            <View key={review._id ?? review.id} style={styles.reviewCard}>
              {review.author ? (
                <Pressable
                  style={styles.reviewAuthorRow}
                  onPress={() =>
                    router.push(`/users/${review.author?.id}` as any)
                  }
                >
                  {review.author.avatarUrl ? (
                    <Image
                      source={{ uri: review.author.avatarUrl }}
                      style={styles.reviewAvatar}
                    />
                  ) : (
                    <View style={styles.reviewEmptyAvatar}>
  <Image
    source={require('@/assets/images/locus_av.jpg')}
    style={styles.defaultReviewAvatarImage}
  />
</View>
                  )}

                  <Text style={styles.authorLink}>{review.author.name}</Text>
                </Pressable>
              ) : (
                <Text style={styles.description}>Користувач</Text>
              )}

              <Text style={styles.description}>{review.text}</Text>

              {review.imageUrls && review.imageUrls.length > 0 ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.photoRow}
                >
                  {review.imageUrls.map((url) => (
                    <Image
                      key={url}
                      source={{ uri: url }}
                      style={styles.reviewImage}
                    />
                  ))}
                </ScrollView>
              ) : null}
            </View>
          ))
        )}
      </View>

      {token ? (
        <View style={styles.profileCard}>
          <Text style={styles.label}>Додати відгук</Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Напишіть відгук"
            value={reviewText}
            multiline
            onChangeText={setReviewText}
          />

          <Pressable style={styles.secondaryButton} onPress={pickReviewImages}>
            <Text style={styles.secondaryButtonText}>
              {reviewImages.length > 0
                ? `Обрано фото: ${reviewImages.length}`
                : 'Додати фото до відгуку'}
            </Text>
          </Pressable>

          {reviewImages.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.photoRow}
            >
              {reviewImages.map((image) => (
                <Image
                  key={image.uri}
                  source={{ uri: image.uri }}
                  style={styles.reviewImage}
                />
              ))}
            </ScrollView>
          ) : null}

          <Pressable style={styles.button} onPress={handleCreateReview}>
            <Text style={styles.buttonText}>Опублікувати відгук</Text>
          </Pressable>
        </View>
      ) : null}

      <Pressable
        style={styles.backButton}
        onPress={() => router.push('/map' as any)}
      >
        <Text style={styles.backButtonText}>Назад до мапи</Text>
      </Pressable>
    </ScrollView>
  );
}