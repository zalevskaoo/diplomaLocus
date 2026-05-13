import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f7f6',
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 18,
    color: '#555',
  },

  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },

  filterButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },

  mapContainer: {
    height: 320,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
  },

  nativeMap: {
    width: '100%',
    height: '100%',
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },

  cardText: {
    fontSize: 14,
    color: '#555',
  },
});