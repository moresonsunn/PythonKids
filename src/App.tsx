import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Code, BookOpen, GamepadIcon } from 'lucide-react'; // Importieren von Icons
import Navigation from './components/Navigation'; // Importieren der Navigation-Komponente
import CodeEditor from './components/CodeEditor'; // Importieren der CodeEditor-Komponente
import LessonContent from './components/LessonContent'; // Importieren der LessonContent-Komponente
import { lessons } from './lessons/index'; // Importieren der Lektionen
import * as tf from '@tensorflow/tfjs';
import { div } from '@tensorflow/tfjs';

const rawTokenizerJson = { "class_name": "Tokenizer", "config": { "num_words": 1000, "filters": "!\"#$%&()*+,-./:;<=>?@[\\]^_`{|}~\t\n", "lower": true, "split": " ", "char_level": false, "oov_token": "<OOV>", "document_count": 21, "word_counts": "{\"name\": 11, \"'\": 20, \"print\": 22, \"alter\": 8, \"zahl\": 29, \"f'\": 1, \"ist\": 5, \"jahre\": 1, \"alt'\": 1, \"int\": 4, \"input\": 5, \"'wie\": 3, \"alt\": 2, \"bist\": 3, \"du\": 4, \"zahl1\": 6, \"'gib\": 2, \"die\": 2, \"erste\": 1, \"ein'\": 2, \"zahl2\": 6, \"zweite\": 1, \"hei\\u00dft\": 1, \"f'hallo\": 1, \"farben\": 14, \"'rot'\": 6, \"'gr\\u00fcn'\": 7, \"'blau'\": 6, \"0\": 3, \"append\": 1, \"'gelb'\": 2, \"for\": 2, \"in\": 2, \"range\": 2, \"1\": 3, \"6\": 1, \"while\": 1, \"10\": 4, \"if\": 4, \"3\": 1, \"break\": 1, \"5\": 1, \"'zahl\": 4, \"gr\\u00f6\\u00dfer\": 2, \"als\": 3, \"5'\": 1, \"10'\": 3, \"elif\": 1, \"kleiner\": 1, \"and\": 1, \"zwischen\": 1, \"und\": 1, \"ff0000'\": 3, \"00ff00'\": 3, \"0000ff'\": 3, \"update\": 1, \"ffff00'\": 1, \"def\": 3, \"mein\": 2, \"return\": 3, \"addiere\": 2, \"multipliziere\": 2}", "word_docs": "{\"'\": 8, \"name\": 4, \"print\": 21, \"zahl\": 11, \"alter\": 4, \"f'\": 1, \"jahre\": 1, \"alt'\": 1, \"ist\": 4, \"alt\": 2, \"'wie\": 2, \"bist\": 2, \"du\": 2, \"input\": 3, \"int\": 3, \"zahl2\": 3, \"die\": 1, \"erste\": 1, \"ein'\": 1, \"zweite\": 1, \"'gib\": 1, \"zahl1\": 3, \"f'hallo\": 1, \"hei\\u00dft\": 1, \"'gr\\u00fcn'\": 6, \"'rot'\": 6, \"'blau'\": 6, \"farben\": 6, \"0\": 2, \"'gelb'\": 2, \"append\": 1, \"for\": 2, \"1\": 2, \"in\": 2, \"6\": 1, \"range\": 2, \"while\": 1, \"10\": 3, \"break\": 1, \"3\": 1, \"if\": 4, \"gr\\u00f6\\u00dfer\": 2, \"5'\": 1, \"als\": 2, \"5\": 1, \"'zahl\": 3, \"kleiner\": 1, \"elif\": 1, \"10'\": 2, \"und\": 1, \"and\": 1, \"zwischen\": 1, \"ff0000'\": 3, \"00ff00'\": 3, \"0000ff'\": 3, \"update\": 1, \"ffff00'\": 1, \"return\": 3, \"mein\": 1, \"def\": 3, \"addiere\": 1, \"multipliziere\": 1}", "index_docs": "{\"4\": 8, \"6\": 4, \"3\": 21, \"2\": 11, \"7\": 4, \"43\": 1, \"44\": 1, \"45\": 1, \"13\": 4, \"31\": 2, \"20\": 2, \"21\": 2, \"16\": 2, \"14\": 3, \"15\": 3, \"10\": 3, \"33\": 1, \"46\": 1, \"34\": 1, \"47\": 1, \"32\": 1, \"9\": 3, \"49\": 1, \"48\": 1, \"8\": 6, \"11\": 6, \"12\": 6, \"5\": 6, \"22\": 2, \"35\": 2, \"50\": 1, \"36\": 2, \"23\": 2, \"37\": 2, \"51\": 1, \"38\": 2, \"52\": 1, \"17\": 3, \"54\": 1, \"53\": 1, \"18\": 4, \"39\": 2, \"56\": 1, \"24\": 2, \"55\": 1, \"19\": 3, \"58\": 1, \"57\": 1, \"25\": 2, \"61\": 1, \"59\": 1, \"60\": 1, \"26\": 3, \"27\": 3, \"28\": 3, \"62\": 1, \"63\": 1, \"30\": 3, \"40\": 1, \"29\": 3, \"41\": 1, \"42\": 1}", "index_word": "{\"1\": \"<OOV>\", \"2\": \"zahl\", \"3\": \"print\", \"4\": \"'\", \"5\": \"farben\", \"6\": \"name\", \"7\": \"alter\", \"8\": \"'gr\\u00fcn'\", \"9\": \"zahl1\", \"10\": \"zahl2\", \"11\": \"'rot'\", \"12\": \"'blau'\", \"13\": \"ist\", \"14\": \"input\", \"15\": \"int\", \"16\": \"du\", \"17\": \"10\", \"18\": \"if\", \"19\": \"'zahl\", \"20\": \"'\", \"21\": \"bist\", \"22\": \"0\", \"23\": \"1\", \"24\": \"als\", \"25\": \"10'\", \"26\": \"ff0000'\", \"27\": \"00ff00'\", \"28\": \"0000ff'\", \"29\": \"def\", \"30\": \"return\", \"31\": \"alt\", \"32\": \"'gib\", \"33\": \"die\", \"34\": \"ein'\", \"35\": \"'gelb'\", \"36\": \"for\", \"37\": \"in\", \"38\": \"range\", \"39\": \"gr\\u00f6\\u00dfer\", \"40\": \"mein\", \"41\": \"addiere\", \"42\": \"multipliziere\", \"43\": \"f'\", \"44\": \"jahre\", \"45\": \"alt'\", \"46\": \"erste\", \"47\": \"zweite\", \"48\": \"hei\\u00dft\", \"49\": \"f'hallo\", \"50\": \"append\", \"51\": \"6\", \"52\": \"while\", \"53\": \"3\", \"54\": \"break\", \"55\": \"5\", \"56\": \"5'\", \"57\": \"elif\", \"58\": \"kleiner\", \"59\": \"and\", \"60\": \"zwischen\", \"61\": \"und\", \"62\": \"update\", \"63\": \"ffff00'\"}", "word_index": "{\"<OOV>\": 1, \"zahl\": 2, \"print\": 3, \"'\": 4, \"farben\": 5, \"name\": 6, \"alter\": 7, \"'gr\\u00fcn'\": 8, \"zahl1\": 9, \"zahl2\": 10, \"'rot'\": 11, \"'blau'\": 12, \"ist\": 13, \"input\": 14, \"int\": 15, \"du\": 16, \"10\": 17, \"if\": 18, \"'zahl\": 19, \"'wie\": 20, \"bist\": 21, \"0\": 22, \"1\": 23, \"als\": 24, \"10'\": 25, \"ff0000'\": 26, \"00ff00'\": 27, \"0000ff'\": 28, \"def\": 29, \"return\": 30, \"alt\": 31, \"'gib\": 32, \"die\": 33, \"ein'\": 34, \"'gelb'\": 35, \"for\": 36, \"in\": 37, \"range\": 38, \"gr\\u00f6\\u00dfer\": 39, \"mein\": 40, \"addiere\": 41, \"multipliziere\": 42, \"f'\": 43, \"jahre\": 44, \"alt'\": 45, \"erste\": 46, \"zweite\": 47, \"hei\\u00dft\": 48, \"f'hallo\": 49, \"append\": 50, \"6\": 51, \"while\": 52, \"3\": 53, \"break\": 54, \"5\": 55, \"5'\": 56, \"elif\": 57, \"kleiner\": 58, \"and\": 59, \"zwischen\": 60, \"und\": 61, \"update\": 62, \"ffff00'\": 63}" } };

type TokenizerJson = {
  word_index: { [word: string]: number };
  oov_token?: string;
};

const embeddedTokenizer: TokenizerJson = {
  word_index: JSON.parse(rawTokenizerJson.config.word_index),
  oov_token: rawTokenizerJson.config.oov_token,
};

function textsToSequences(texts: string[], tokenizerJson: TokenizerJson): number[][] {
  const wordIndex = tokenizerJson.word_index;
  const oovTokenIndex = tokenizerJson.oov_token ? wordIndex[tokenizerJson.oov_token] : 1;
  return texts.map(text =>
    text
      .toLowerCase()
      .replace(/[^\wäöüß]+/gi, " ")
      .split(/\s+/)
      .filter(Boolean)
      .map(word => wordIndex[word] || oovTokenIndex)
  );
}

function preprocessCode(code: string): string {
  code = code.replace(/'[^']*'/g, "'<NAME>'");
  code = code.replace(/"[^"]*"/g, '"<NAME>"');
  code = code.replace(/\b\d+\b/g, "<ZAHL>");
  return code;
}

const normalizeCode = (source: string) => source.toLowerCase();
const hasAssignment = (code: string) => /\b[a-zA-Z_][\w]*\s*=/.test(code);
const hasStringLiteral = (code: string) => /["'][^"']+["']/.test(code);
const hasNumberLiteral = (code: string) => /\b\d+\b/.test(code);

const containsAllFragments = (output: string, fragments: string[]) => {
  const lower = output.toLowerCase();
  return fragments.every(fragment => lower.includes(fragment.toLowerCase()));
};

const looksLikeCollection = (output: string, open: string, close: string) =>
  output.includes(open) && output.includes(close);

const extractIntegerLines = (output: string) =>
  output
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => /^-?\d+$/.test(line))
    .map(Number);

const matchesSequence = (output: string, expected: number[]) => {
  const numbers = extractIntegerLines(output);
  if (numbers.length < expected.length) return false;
  return expected.every((value, index) => numbers[index] === value);
};

const isBooleanText = (output: string) => {
  const normalized = output.trim().toLowerCase();
  return normalized === 'true' || normalized === 'false';
};

const errorHelp: Record<string, string> = {
  SyntaxError: 'Syntaxfehler: Prüfe, ob alle Klammern, Doppelpunkte oder Anführungszeichen korrekt gesetzt sind.',
  NameError: 'NameError: Nutzt du den richtigen Variablennamen?',
  IndentationError: 'Einrückungsfehler: Achte auf eine konsistente Einrückung mit Leerzeichen oder Tabs.',
  TypeError: 'TypeError: Prüfe, ob du passende Datentypen kombinierst (z. B. Zahl vs. Text).',
  ValueError: 'ValueError: Sind deine Eingaben im richtigen Format?',
  ZeroDivisionError: 'ZeroDivisionError: Teilen durch 0 ist nicht erlaubt.',
  IndexError: 'IndexError: Bleibe innerhalb der Grenzen einer Liste oder eines anderen Index-basierten Objekts.',
  KeyError: 'KeyError: Verwende einen Schlüssel, der im Dictionary existiert.',
  AttributeError: 'AttributeError: Greifst du auf eine vorhandene Methode oder ein vorhandenes Attribut zu?',
  ModuleNotFoundError: 'ModuleNotFoundError: Wurde das Modul korrekt installiert und importiert?',
  RecursionError: 'RecursionError: Deine Funktion ruft sich zu oft selbst auf – prüfe die Abbruchbedingung.',
  UnboundLocalError: 'UnboundLocalError: Nutzt du Variablen, bevor sie deklariert oder zugewiesen wurden?',
};

type LessonValidationRule = {
  outputRegex?: RegExp;
  requiredIncludes?: string[];
  validator?: (output: string) => boolean;
};

const lessonValidationRules: Record<string, LessonValidationRule> = {
  'variables-1': { validator: (output) => containsAllFragments(output, ['willkommen']) },
  'variables-2': { validator: (output) => containsAllFragments(output, ['tage geübt']) },
  'variables-3': { validator: (output) => containsAllFragments(output, ['jahre']) && containsAllFragments(output, ['ist']) },
  'operators-1': { validator: (output) => containsAllFragments(output, ['fläche']) },
  'operators-2': { validator: isBooleanText },
  'operators-3': { validator: isBooleanText },
  'input-1': { validator: (output) => containsAllFragments(output, ['hallo']) },
  'input-2': { validator: (output) => containsAllFragments(output, ['summe']) },
  'input-3': { validator: (output) => containsAllFragments(output, ['stunden']) },
  'lists-1': { validator: (output) => looksLikeCollection(output, '[', ']') },
  'lists-2': { validator: (output) => containsAllFragments(output, ['deutsch']) },
  'lists-3': { validator: (output) => containsAllFragments(output, ['sport']) },
  'loops-1': { validator: (output) => matchesSequence(output, [1, 2, 3]) },
  'loops-2': { validator: (output) => matchesSequence(output, [3, 2, 1]) },
  'loops-3': { validator: (output) => containsAllFragments(output, ['stop bei 3']) },
  'conditions-1': { validator: (output) => containsAllFragments(output, ['level']) },
  'conditions-2': {
    validator: (output) => ['heiß', 'angenehm', 'kalt'].some(word => containsAllFragments(output, [word])),
  },
  'conditions-3': {
    validator: (output) => containsAllFragments(output, ['bedingung']) || containsAllFragments(output, ['mindestens']),
  },
  'dictionaries-1': { validator: (output) => looksLikeCollection(output, '{', '}') && output.includes(':') },
  'dictionaries-2': { validator: (output) => containsAllFragments(output, ['noah']) },
  'dictionaries-3': { validator: (output) => containsAllFragments(output, ['ella']) },
  'functions-1': { validator: (output) => containsAllFragments(output, ['lieblingsfarbe']) },
  'functions-2': { validator: (output) => extractIntegerLines(output).length >= 1 },
  'functions-3': { validator: (output) => /\d/.test(output) },
  'errors-1': { validator: (output) => containsAllFragments(output, ['hallo welt']) },
  'errors-2': { validator: (output) => /\d/.test(output) && !output.toLowerCase().includes('fehler') },
  'errors-3': { validator: (output) => containsAllFragments(output, ['zahl']) },
};

const topicCodeValidators: Record<string, (code: string) => boolean> = {
  variables: (code) => {
    const normalized = normalizeCode(code);
    return hasAssignment(normalized) && !/(\bfor\b|\bwhile\b|\bdef\b|\binput\b)/.test(normalized);
  },
  operators: (code) => {
    const normalized = normalizeCode(code);
    return /[+\-*/]/.test(normalized) || /(==|!=|<=|>=)/.test(normalized) || /(\band\b|\bor\b)/.test(normalized);
  },
  input: (code) => /\binput\s*\(/i.test(code),
  lists: (code) => /\[[^\]]*\]/.test(code) || /\.append\s*\(/i.test(code),
  dictionaries: (code) => /\{[^}]+:[^}]+\}/.test(code) || /\.update\s*\(/i.test(code),
  loops: (code) => /\b(for|while)\b/i.test(code),
  conditions: (code) => /\bif\b/i.test(code),
  functions: (code) => /\bdef\b/i.test(code),
  errors: (code) => code.trim().length > 0,
  textadventure: (code) => code.trim().length > 0,
};

const subLessonCodeValidators: Record<string, (code: string) => boolean> = {
  'variables-1': (code) => {
    const normalized = normalizeCode(code);
    return hasAssignment(code) && hasStringLiteral(code) && /print\s*\(/.test(normalized) && !/\binput\b/.test(normalized);
  },
  'variables-2': (code) => {
    const normalized = normalizeCode(code);
    return hasAssignment(code) && hasNumberLiteral(code) && /print\s*\(/.test(normalized);
  },
  'variables-3': (code) => {
    const assignmentCount = (code.match(/\b[a-zA-Z_][\w]*\s*=/g) || []).length;
    const usesFormattedOutput = /f["']/.test(code) || /format\s*\(/i.test(code) || /\+/.test(code);
    return assignmentCount >= 2 && usesFormattedOutput;
  },
  'operators-1': (code) => /\*/.test(code) && /print/.test(normalizeCode(code)),
  'operators-2': (code) => /(==|!=|<=|>=)/.test(code),
  'operators-3': (code) => /(\band\b|\bor\b)/.test(normalizeCode(code)),
  'input-1': (code) => /\binput\s*\(/i.test(code) && /print\s*\(/i.test(code),
  'input-2': (code) => (code.match(/input\s*\(/gi)?.length ?? 0) >= 2 && /\+/.test(code),
  'input-3': (code) => (code.match(/input\s*\(/gi)?.length ?? 0) >= 2 && (/f["']/.test(code) || /format\s*\(/i.test(code)),
  'lists-1': (code) => /\[[^\]]+\]/.test(code) && /print/.test(normalizeCode(code)),
  'lists-2': (code) => /print\s*\([^\[]*\[[^\]]+\]\s*\)/i.test(code),
  'lists-3': (code) => /\.append\s*\(/i.test(code),
  'loops-1': (code) => /\bfor\b/i.test(code) && /range\s*\(/i.test(code),
  'loops-2': (code) => /\bwhile\b/i.test(code),
  'loops-3': (code) => /\bfor\b/i.test(code) && /\bbreak\b/i.test(code),
  'conditions-1': (code) => (code.match(/\bif\b/gi)?.length ?? 0) >= 1,
  'conditions-2': (code) => /\belif\b/i.test(code),
  'conditions-3': (code) => /(\band\b|\bor\b)/i.test(code),
  'dictionaries-1': (code) => /\{[^}]+:[^}]+\}/.test(code),
  'dictionaries-2': (code) => /print\s*\(.*\[["'][^"']+["']\]\s*\)/i.test(code),
  'dictionaries-3': (code) => /\.update\s*\(/i.test(code) || /\[["'][^"']+["']\]\s*=/.test(code),
  'functions-1': (code) => {
    const normalized = normalizeCode(code);
    return /\bdef\b/.test(normalized) && (/return/.test(normalized) || /print/.test(normalized));
  },
  'functions-2': (code) => /\bdef\b/i.test(code) && /\+/.test(code),
  'functions-3': (code) => {
    const normalized = normalizeCode(code);
    return /\bdef\b/.test(normalized) && (/\*/.test(code) || /return/.test(normalized));
  },
};

const codeMatchesTopic = (topicId: string, source: string) => {
  const validator = topicCodeValidators[topicId];
  return validator ? validator(source) : true;
};

const codeMatchesSubLesson = (subLessonId: string, source: string) => {
  const validator = subLessonCodeValidators[subLessonId];
  return validator ? validator(source) : true;
};

const resolveTopicName = (topicId: string) => {
  const topic = lessons.find((lesson) => lesson.id === topicId);
  return (topic as any)?.title || (topic as any)?.name || topicId;
};

const doesOutputMatchLesson = (subLesson: any, output: string): boolean => {
  if (!subLesson) return false;
  const trimmed = output.trim();
  if (!trimmed) return false;

  const rule = subLesson ? lessonValidationRules[subLesson.id] : undefined;
  if (rule) {
    if (rule.validator && !rule.validator(trimmed)) return false;
    if (rule.outputRegex && !rule.outputRegex.test(trimmed)) return false;
    if (rule.requiredIncludes && !rule.requiredIncludes.every((fragment) => trimmed.includes(fragment))) {
      return false;
    }
  }
  return true;
};

const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('variables'); // Standardmäßig die erste Lektion auswählen
  const [selectedSubLesson, setSelectedSubLesson] = useState('variables-1'); // Standardmäßig die erste Unterlektion auswählen
  const [learningStyle, setLearningStyle] = useState<'text' | 'interactive'>('text'); // Standardmäßig den Lernstil auf 'text' setzen
  const [code, setCode] = useState(''); // Code, der im Editor angezeigt wird
  const [output, setOutput] = useState(''); // Ausgabe des Codes
  const [isError, setIsError] = useState(false); // Fehlerstatus
  const [pyodide, setPyodide] = useState<any>(null); // Pyodide-Instanz
  const [input, setInput] = useState(''); // Eingabewert für den Benutzer
  const [inputQueue, setInputQueue] = useState<any[]>([]);  // Warteschlange für Benutzereingaben
  const [isInputRequired, setIsInputRequired] = useState(false); // Eingabe erforderlich-Status
  const [, setIsLoading] = useState(false); // Ladezustand
  const [completedLessons, setCompletedLessons] = useState<string[]>([]); // Abgeschlossene Lektionen

  const totalSubLessons = useMemo(
    () => lessons.reduce((sum, lesson) => sum + lesson.subLessons.length, 0),
    []
  );
  const calculateProgress = () => {
    if (!totalSubLessons) return 0;
    return Math.min(100, Math.round((completedLessons.length / totalSubLessons) * 100));
  };

  // Modell-Referenz für KI
  const modelRef = useRef<tf.LayersModel | null>(null);

  // State for tokenizer JSON loaded from local file
  const [tokenizerJson] = useState<TokenizerJson>(embeddedTokenizer);

  // useEffect-Hook zum Initialisieren von Pyodide
  useEffect(() => {
    async function initPyodide() {
      function waitForPyodide() {
        return new Promise<void>((resolve) => {
          function check() {
            if ((window as any).loadPyodide) {
              resolve();
            } else {
              setTimeout(check, 50);
            }
          }
          check();
        });
      }
      await waitForPyodide();

      // @ts-ignore - Check if running in Electron with offline paths
      const pyodideDir = window.offlinePaths?.pyodideDir;
      // @ts-ignore - Check if in Electron environment
      const isElectron = window.offlinePaths !== undefined;

      let py = null;

      // Try offline/local path first
      if (pyodideDir) {
        try {
          // Convert Windows backslashes to forward slashes for file:// URL
          const normalizedPath = pyodideDir.replace(/\\/g, '/');
          py = await (window as any).loadPyodide({ indexURL: `file:///${normalizedPath}/` });
          setPyodide(py);
          console.log("Pyodide offline geladen.");
          return;
        } catch (err) {
          console.error("Offline Pyodide konnte nicht geladen werden:", err);
        }
      }

      // Try loading from local server path (for dev mode or web deployment)
      try {
        py = await (window as any).loadPyodide({ indexURL: './pyodide/' });
        setPyodide(py);
        console.log("Pyodide von lokalem Pfad geladen.");
        return;
      } catch (localErr) {
        console.error("Lokales Pyodide fehlgeschlagen:", localErr);
      }

      // Only try CDN if NOT in Electron (for web-only fallback)
      if (!isElectron) {
        try {
          py = await (window as any).loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.3/full/" });
          setPyodide(py);
          console.log("Pyodide von CDN geladen.");
        } catch (cdnErr) {
          console.error("Pyodide konnte auch online nicht geladen werden!", cdnErr);
        }
      } else {
        console.error("Pyodide konnte nicht offline geladen werden. Bitte überprüfe die Installation.");
      }
    }
    initPyodide();
  }, []);

  useEffect(() => {
    const loadModel = async () => {
      try {
        // Versuche, den Offline-Pfad zu verwenden
        // @ts-ignore
        const modelPath = window.offlinePaths?.modelJson;
        if (modelPath) {
          console.log("Lade Modell von:", modelPath);
          modelRef.current = await tf.loadLayersModel(`file://${modelPath}`);
          console.log("Modell erfolgreich geladen.");
        } else {
          // Fallback: Standardpfad verwenden
          console.log("Verwende Fallback-Pfad für Modell");
          modelRef.current = await tf.loadLayersModel('/model_web/model.json');
          console.log("Modell erfolgreich geladen (Fallback).");
        }
      } catch (error) {
        console.error("Fehler beim Laden des Modells:", error);
        // Versuche es nochmal mit dem relativen Pfad
        try {
          console.log("Versuche relativen Pfad für Modell");
          modelRef.current = await tf.loadLayersModel('./model_web/model.json');
          console.log("Modell erfolgreich geladen (relativer Pfad).");
        } catch (fallbackError) {
          console.error("Auch Fallback-Pfad fehlgeschlagen:", fallbackError);
        }
      }
    };
    loadModel();
  }, []);

  const checkCodeWithModel = async (source: string): Promise<boolean> => {
    if (!modelRef.current || !tokenizerJson) {
      console.error("Modell oder Tokenizer ist nicht geladen.");
      return false;
    }

    try {
      const preprocessed = preprocessCode(source);
      const seq = textsToSequences([preprocessed], tokenizerJson).map(sequence => {
        const padded = [...sequence];
        while (padded.length < 50) padded.push(0);
        return padded.slice(0, 50);
      });

      return tf.tidy(() => {
        const inputTensor = tf.tensor2d(seq, [1, 50]);
        const prediction = modelRef.current!.predict(inputTensor) as tf.Tensor;
        const score = prediction.dataSync()[0];
        return score >= 0.5;
      });
    } catch (error) {
      console.error("Fehler bei der KI-Bewertung:", error);
      return false;
    }
  };

  // Punkte nur vergeben, wenn KI-Auswertung korrekt ist UND keine Fehlermeldung im Output steht
  const executeCode = async (newInput: string = '') => {
    if (!pyodide) {
      setOutput('Python-Interpreter wird noch geladen. Bitte warte einen Moment und versuche es erneut.');
      setIsError(true);
      return;
    }
    const currentLesson = lessons.find((lesson) => lesson.id === selectedTopic);
    const currentSubLesson = currentLesson?.subLessons.find(
      (sub) => sub.id === selectedSubLesson
    );
    if (!currentLesson || !currentSubLesson) {
      setIsError(true);
      setOutput('Für diese Auswahl konnte keine Aufgabe gefunden werden.');
      return;
    }
    if (!codeMatchesTopic(selectedTopic, code)) {
      setIsError(true);
      setIsLoading(false);
      setOutput(
        `Dein Code passt nicht zum aktuellen Thema "${resolveTopicName(selectedTopic)}". ` +
        "Bitte orientiere dich an der Aufgabenstellung."
      );
      return;
    }
    // Sub-lesson code structure check removed - we only check topic-level concepts
    // and validate the output matches expectations
    setIsInputRequired(false);
    resetExecution();
    setIsLoading(true);
    try {
      const updatedQueue = newInput ? [...inputQueue, newInput] : inputQueue;
      setInputQueue(updatedQueue);

      const queueJson = JSON.stringify(updatedQueue);
      const errorHelpJson = JSON.stringify(errorHelp);
      const escapedCode = code.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

      await pyodide.runPythonAsync(`
import sys, io, builtins, json
sys.stdout = io.StringIO()
sys.stderr = sys.stdout
input_queue = iter(json.loads('${queueJson}'))

def custom_input(prompt=""):
    print(prompt, end="")
    try:
        return next(input_queue)
    except StopIteration:
        print("Eingabe erforderlich")
        raise Exception("Eingabe erforderlich")

builtins.input = custom_input
error_help = json.loads('${errorHelpJson}')
      `);

      try {
        await pyodide.runPythonAsync(`
try:
    exec("""${escapedCode}""")
except Exception as e:
    error_type = type(e).__name__
    if error_type == "Eingabe erforderlich":
        print("Eingabe erforderlich")
    elif error_type in error_help:
        print(error_help[error_type])
        print(f"Fehler: {error_type}: {str(e)}")
    else:
        print(f"Fehler: {str(e)}")
        `);
      } catch (runErr) {
        console.error("Pyodide execution error:", runErr);
      }

      let output = pyodide.runPython("sys.stdout.getvalue()");
      const trimmedOutput = output?.trim() ?? '';
      const normalizedOutput = trimmedOutput || 'Keine Ausgabe';
      setOutput(normalizedOutput);

      // Prüfen, ob eine Eingabe erforderlich ist
      if (output && output.includes("Eingabe erforderlich")) {
        setIsInputRequired(true);
        setIsLoading(false);
        return; // Keine Modellprüfung, sondern auf Eingabe warten!
      }

      setInputQueue([]);

      // Prüfen auf Fehlermeldungen im Output
      const hasError =
        /Fehler:|Syntaxfehler|SyntaxError|Exception|Traceback|Einrückungsfehler|TypeError|NameError|IndentationError|ZeroDivisionError|Keine Ausgabe|IndexError|KeyError|AttributeError|ValueError|ModuleNotFoundError|RecursionError|UnboundLocalError/.test(
          output
        );

      const matchesLessonExpectations = doesOutputMatchLesson(currentSubLesson, output);
      // Simplified validation: check output correctness only (topic-level concept check already done above)
      const isCorrect = !hasError && matchesLessonExpectations;

      if (isCorrect && currentSubLesson) {
        if (!completedLessons.includes(selectedSubLesson)) {
          setCompletedLessons([...completedLessons, selectedSubLesson]);
        }
        setIsError(false);
      } else {
        setIsError(true);
        setOutput(
          normalizedOutput +
          "\n\nDas Ergebnis ist nicht korrekt oder passt nicht zur aktuellen Aufgabe. Bitte überprüfe deinen Code."
        );
        console.error("Falsches Ergebnis oder falsche Lektion:", output);
        return;
      }
    } catch (err) {
      console.error("Execution error:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    setInput(''); // Eingabefeld zurücksetzen

    // Direkt mit neuer Eingabe ausführen
    await executeCode(trimmed);
  };

  // Reset-Funktion, um den Zustand zurückzusetzen
  const resetExecution = () => {
    // setInputQueue([]); // Entfernt! Nicht mehr bei jedem Ausführen leeren!
    setOutput(''); // Ausgabe zurücksetzen
    setIsInputRequired(false); // Eingabe erforderlich-Status zurücksetzen
    setIsError(false); // Fehlerstatus zurücksetzen
  };

  // inputQueue nur beim Wechsel der Lektion/Unterlektion zurücksetzen!
  useEffect(() => {
    setInputQueue([]);
  }, [selectedTopic, selectedSubLesson]);

  useEffect(() => {
    const currentLesson = lessons.find((lesson) => lesson.id === selectedTopic);
    const currentSubLesson = currentLesson?.subLessons.find(
      (sub) => sub.id === selectedSubLesson
    );
    setCode(currentSubLesson?.initialCode || '');
  }, [selectedTopic, selectedSubLesson]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">PythonKids</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setLearningStyle('text')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${learningStyle === 'text' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <BookOpen className="h-5 w-5 inline-block mr-1" />
                Erklärung
              </button>
              <button
                onClick={() => setLearningStyle('interactive')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${learningStyle === 'interactive' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <GamepadIcon className="h-5 w-5 inline-block mr-1" />
                Interaktiv
              </button>
              {/*<div className="flex items-center"> 
                <img
                  src="src/pictures/banner.png"
                  alt="Banner"
                  className="h-8 rounded-full max-w-[30%] max-h-[30%]"
                />
              </div>*/}
              {/* Compact Gamified Progress Badge */}
              <div className="relative group cursor-pointer flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 px-3 py-1.5 rounded-full border border-indigo-100 hover:shadow-md transition-all duration-300">
                {/* Animated gem icon */}
                <div className="relative">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L4 8L12 22L20 8L12 2Z"
                      fill="url(#gemGradient)"
                      className="drop-shadow-sm"
                    />
                    <path
                      d="M4 8H20L12 2L4 8Z"
                      fill="url(#gemTopGradient)"
                      opacity="0.9"
                    />
                    <path
                      d="M12 2L8 8L12 22L16 8L12 2Z"
                      fill="white"
                      opacity="0.3"
                    />
                    <defs>
                      <linearGradient id="gemGradient" x1="4" y1="2" x2="20" y2="22">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#c084fc" />
                      </linearGradient>
                      <linearGradient id="gemTopGradient" x1="4" y1="2" x2="20" y2="8">
                        <stop offset="0%" stopColor="#a5b4fc" />
                        <stop offset="100%" stopColor="#818cf8" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Sparkle effect */}
                  {calculateProgress() > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-300"></span>
                    </span>
                  )}
                </div>

                {/* Progress text */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-gray-500">Fortschritt:</span>
                  <span className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {completedLessons.length}
                  </span>
                  <span className="text-xs text-gray-400">/</span>
                  <span className="text-xs text-gray-500">{totalSubLessons} Punkte</span>
                </div>

                {/* Mini progress dots */}
                <div className="flex gap-0.5 ml-1">
                  {[...Array(5)].map((_, i) => {
                    const segmentProgress = (calculateProgress() / 100) * 5;
                    const isFilled = i < Math.floor(segmentProgress);
                    const isPartial = i === Math.floor(segmentProgress) && segmentProgress % 1 > 0;
                    return (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isFilled
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                          : isPartial
                            ? 'bg-gradient-to-r from-indigo-300 to-purple-300'
                            : 'bg-gray-200'
                          }`}
                      />
                    );
                  })}
                </div>

                {/* Tooltip on hover */}
                <div className="absolute right-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                  <div className="bg-gray-800/95 backdrop-blur-sm text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                    <div className="flex items-center gap-2">
                      <span>💎</span>
                      <span>{completedLessons.length} von {totalSubLessons} Lektionen geschafft!</span>
                    </div>
                    <div className="mt-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full transition-all duration-500"
                        style={{ width: `${calculateProgress()}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Navigation
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              selectedSubLesson={selectedSubLesson}
              setSelectedSubLesson={(subLesson: string) => setSelectedSubLesson(subLesson)}
              lessons={lessons}
            />
          </div>

          <div className="col-span-9">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <LessonContent
                topic={selectedTopic}
                selectedSubLesson={selectedSubLesson}
                learningStyle={learningStyle == 'text' ? 'text' : 'interactive'}
                isError={isError}
                onErrorCountChange={(count) => {
                  console.log('Error count:', count);
                }}
                initialCode={code}
              />
            </div>

            {learningStyle === 'interactive' && (
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <CodeEditor code={code} setCode={setCode} onRun={() => executeCode()} />
                </div>

                <div className={`bg-white rounded-lg shadow-lg p-6 ${isError ? 'bg-red-100' : 'bg-yellow-100'}`}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Ausgabe</h3>
                  <pre className="whitespace-pre-wrap break-words">{output}</pre>
                  <div className="output-container"></div>
                  {isInputRequired && (
                    <form onSubmit={handleInputSubmit}>
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Benutzereingabe..."
                      />
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <footer className="text-center mt-8 text-gray-600">
          Entwickelt von Philip Terber
        </footer> */}
      </div>
    </div>
  );
};

export default App;
