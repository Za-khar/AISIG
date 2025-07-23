export default {
  input: {},

  button: {},

  validation: {
    min: 'Minimum characters: {{value}}',
    max: 'Maximum characters: {{value}}',
    email: 'Invalid email address',
    phone: 'Invalid phone number',
    required: 'This field is required',
    password: 'Invalid password',
    number: 'This field must contain a numeric value',
    length: 'This field must be {{value}} characters long',
  },

  error: {
    NETWORK_ERROR:
      'Network error. Please check your internet connection and try again.',
    TIMEOUT_ERROR: 'Request timeout. Please try again later.',
    SERVER_ERROR:
      'A server error occurred. Our team has been notified. Please try again later.',
    NOT_FOUND: 'The requested resource was not found.',
    UNAUTHORIZED: 'Please log in to continue.',
    FORBIDDEN: 'You do not have permission to access this resource.',
    BAD_REQUEST: 'Invalid request. Please check your input and try again.',
    DEFAULT_ERROR: 'Something went wrong. Please try again.',
  },

  common: {},

  toast: {
    success: {},
  },

  tabs: {
    generate: 'Generate',
    filters: 'Filters',
    gallery: 'Gallery',
  },
}
