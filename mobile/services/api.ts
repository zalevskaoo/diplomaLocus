const API_URL = 'http://localhost:3000';


export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    ...data,
  };
}

export async function toggleSavedPoint(
  token: string,
  pointId: string,
) {
  const response = await fetch(
    `http://localhost:3000/users/me/saved-points/${pointId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.json();
}

export async function getSavedPointIds(token: string) {
  const response = await fetch(
    'http://localhost:3000/users/me/saved-points',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.json();
}

export async function geocodeAddress(address: string) {
  const query = `${address}, Kyiv, Ukraine`;

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`,
    {
      headers: {
        'Accept': 'application/json',
      },
    },
  );

  const data = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return {
    latitude: Number(data[0].lat),
    longitude: Number(data[0].lon),
    displayName: data[0].display_name,
  };
}

export async function searchAddresses(query: string) {
  const fullQuery = `${query}, Kyiv, Ukraine`;

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=5&addressdetails=1&q=${encodeURIComponent(fullQuery)}`,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );

  const data = await response.json();

  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    label: item.display_name,
    latitude: Number(item.lat),
    longitude: Number(item.lon),
  }));
}

export async function register(
  name: string,
  email: string,
  password: string,
) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    ...data,
  };
}

export async function getPoints() {
  const response = await fetch(`${API_URL}/points`);

  return response.json();
}

export async function createPoint(
  token: string,
  point: {
    title: string;
    category: string;
    address?: string;
    description?: string;
    latitude?: number;
    longitude?: number;
    type?: 'point' | 'path';
    path?: {
      latitude: number;
      longitude: number;
    }[];
  },
) {
  const response = await fetch(`${API_URL}/points`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(point),
  });

  return response.json();
}
export async function updatePoint(
  token: string,
  id: string,
  point: {
    title?: string;
    category?: string;
    address?: string;
    description?: string;
    latitude?: number;
    longitude?: number;
    type?: 'point' | 'path';
    path?: {
      latitude: number;
      longitude: number;
    }[];
  },
) {
  const response = await fetch(`${API_URL}/points/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(point),
  });

  return response.json();
}

export async function deletePoint(token: string, id: string) {
  const response = await fetch(`${API_URL}/points/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function uploadPointImage(
  token: string,
  pointId: string,
  imageFile: any,
) {
  const formData = new FormData();

  formData.append('image', imageFile);

  const response = await fetch(
    `http://localhost:3000/points/${pointId}/images`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  return response.json();
}

export async function toggleSavedUser(
  token: string,
  userId: string,
) {
  const response = await fetch(
    `http://localhost:3000/users/me/saved-users/${userId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.json();
}

export async function getSavedUsers(token: string) {
  const response = await fetch(
    'http://localhost:3000/users/me/saved-users',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.json();
}
export async function getReviews(pointId: string) {
  const response = await fetch(
    `http://localhost:3000/points/${pointId}/reviews`,
  );

  return response.json();
}

export async function createReview(
  token: string,
  pointId: string,
  text: string,
  images: any[],
) {
  const formData = new FormData();

  formData.append('text', text);

  for (const image of images) {
    const imageFile = image.file
      ? image.file
      : ({
          uri: image.uri,
          name: 'review-image.jpg',
          type: 'image/jpeg',
        } as any);

    formData.append('images', imageFile);
  }

  const response = await fetch(
    `http://localhost:3000/points/${pointId}/reviews`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  return response.json();
}
export async function resendVerificationEmail(
  email: string,
) {
  const response = await fetch(
    `${API_URL}/auth/resend-verification`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    },
  );

  return response.json();
}