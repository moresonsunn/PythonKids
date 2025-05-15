import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Embedding, GlobalAveragePooling1D
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np

# Daten aus den Lektionen
texts = [
    # Variablen
    "name = 'Max'\nprint(name)",  # variables-1
    "alter = 10\nprint(alter)",  # variables-2
    "name = 'Max'\nalter = 10\nprint(f'{name} ist {alter} Jahre alt')",  # variables-3

    # Input
    "alter = int(input('Wie alt bist du?'))\nprint(alter)",  # input-1
    "zahl1 = int(input('Gib die erste Zahl ein'))\nzahl2 = int(input('Gib die zweite Zahl ein'))\nprint(zahl1 + zahl2)",  # input-2
    "name = input('Wie heißt du?')\nalter = int(input('Wie alt bist du?'))\nprint(f'Hallo, {name} du bist {alter}!')",  # input-3

    # Listen
    "farben = ['Rot', 'Grün', 'Blau']\nprint(farben)",  # lists-1
    "farben = ['Rot', 'Grün', 'Blau']\nprint(farben[0])",  # lists-2
    "farben = ['Rot', 'Grün', 'Blau']\nfarben.append('Gelb')\nprint(farben)",  # lists-3

    # Schleifen
    "for zahl in range(1, 6):\n    print(zahl)",  # loops-1
    "zahl = 5\nwhile zahl >= 1:\n    print(zahl)\n    zahl -= 1",  # loops-2
    "for zahl in range(10):\n    if zahl == 3:\n        break\n    print(zahl)",  # loops-3

    # Bedingungen
    "zahl = 10\nif zahl > 5:\n    print('Zahl ist größer als 5')",  # conditions-1
    "zahl = 5\nif zahl > 10:\n    print('Zahl ist größer als 10')\nelif zahl < 10:\n    print('Zahl ist kleiner als 10')",  # conditions-2
    "zahl = 5\nif zahl > 0 and zahl < 10:\n    print('Zahl ist zwischen 0 und 10')",  # conditions-3

    # Dictionaries
    "farben = {'rot': '#ff0000', 'grün': '#00ff00', 'blau': '#0000ff'}\nprint(farben)",  # dictionaries-1
    "farben = {'rot': '#ff0000', 'grün': '#00ff00', 'blau': '#0000ff'}\nprint(farben['grün'])",  # dictionaries-2
    "farben = {'rot': '#ff0000', 'grün': '#00ff00', 'blau': '#0000ff'}\nfarben.update({'gelb': '#ffff00'})\nprint(farben)",  # dictionaries-3

    # Funktionen
    "def mein_name():\n    return 'Max'\nprint(mein_name())",  # functions-1
    "def addiere(zahl1, zahl2):\n    return zahl1 + zahl2\nprint(addiere(2, 3))",  # functions-2
    "def multipliziere(zahl1, zahl2):\n    return zahl1 * zahl2\nprint(multipliziere(2, 3))",  # functions-3
]

# Labels: 1 = korrekt, 0 = falsch
labels = [1] * len(texts)  # Alle Beispiele sind korrekt

# Tokenizer vorbereiten
tokenizer = Tokenizer(num_words=1000, oov_token="<OOV>")
tokenizer.fit_on_texts(texts)
sequences = tokenizer.texts_to_sequences(texts)
padded_sequences = pad_sequences(sequences, maxlen=500, padding='post')

# Modell erstellen
model = Sequential([
    Embedding(1000, 16, input_length=50),
    GlobalAveragePooling1D(),
    Dense(16, activation='relu'),
    Dense(1, activation='sigmoid')
])

# Modell kompilieren
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Modell trainieren
model.fit(np.array(padded_sequences), np.array(labels), epochs=500)

# Modell speichern
model.save("text_classification_model.keras")