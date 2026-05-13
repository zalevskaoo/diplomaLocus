import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f4f7f6',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#d9eee8',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: '700',
    color: '#31544a',
    marginBottom: 18,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 14,
    color: '#1f1f1f',
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 17,
    color: '#555',
    lineHeight: 25,
    marginBottom: 22,
  },
  button: {
    backgroundColor: '#31544a',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 20,
    gap: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
    color: '#1f1f1f',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
});