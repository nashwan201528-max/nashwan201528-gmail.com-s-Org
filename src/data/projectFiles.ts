import { RAW_INDEX_HTML } from './rawIndexHtml';

export interface ProjectFile {
  path: string;
  name: string;
  language: 'kotlin' | 'groovy' | 'xml' | 'html' | 'markdown';
  description: string;
  content: string;
}

export const PROJECT_FILES: Record<string, ProjectFile> = {
  'MainActivity.kt': {
    path: 'app/src/main/java/com/example/scicalc/MainActivity.kt',
    name: 'MainActivity.kt',
    language: 'kotlin',
    description: 'Main Android activity hosting the WebView and loading the calculator asset',
    content: `package com.example.scicalc

import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        webView = WebView(this)
        setContentView(webView)

        val settings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        // إذا احتجت خصائص إضافية: settings.allowFileAccess = true, settings.allowFileAccessFromFileURLs = true

        webView.webViewClient = WebViewClient()
        webView.webChromeClient = WebChromeClient()
        WebView.setWebContentsDebuggingEnabled(true) // تعطيل قبل الإطلاق إن رغبت

        webView.loadUrl("file:///android_asset/www/index.html")
    }

    override fun onBackPressed() {
        if (this::webView.isInitialized && webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}`
  },

  'AndroidManifest.xml': {
    path: 'app/src/main/AndroidManifest.xml',
    name: 'AndroidManifest.xml',
    language: 'xml',
    description: 'App manifest declaring INTERNET permission, app label (آلة حاسبة علمية), and MainActivity',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.scicalc">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:label="آلة حاسبة علمية"
        android:theme="@style/Theme.AppCompat.Light.NoActionBar">
        <activity android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`
  },

  'app/build.gradle': {
    path: 'app/build.gradle',
    name: 'build.gradle (Module: app)',
    language: 'groovy',
    description: 'App-level Gradle script configuring Android SDK 33, dependencies, and APK packaging',
    content: `plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    compileSdk 33

    defaultConfig {
        applicationId "com.example.scicalc"
        minSdk 21
        targetSdk 33
        versionCode 1
        versionName "1.0"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
}

dependencies {
    implementation "androidx.core:core-ktx:1.9.0"
    implementation "androidx.appcompat:appcompat:1.6.1"
    implementation "com.google.android.material:material:1.8.0"
}`
  },

  'build.gradle': {
    path: 'build.gradle',
    name: 'build.gradle (Project: ScientificCalculator)',
    language: 'groovy',
    description: 'Project-level Gradle script defining repositories and Android Gradle Plugin classpath',
    content: `// ملف build.gradle بالمستوى الأعلى (Project)
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath "com.android.tools.build:gradle:8.1.1"
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.8.21"
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}`
  },

  'settings.gradle': {
    path: 'settings.gradle',
    name: 'settings.gradle',
    language: 'groovy',
    description: 'Gradle settings file defining root project name and including the :app module',
    content: `rootProject.name = "ScientificCalculator"
include(":app")`
  },

  'index.html': {
    path: 'app/src/main/assets/www/index.html',
    name: 'index.html (WebView Asset)',
    language: 'html',
    description: 'Scientific calculator web app loaded by WebView via file:///android_asset/www/index.html',
    content: RAW_INDEX_HTML
  }
};

export const BUILD_STEPS_AR = [
  {
    step: 1,
    title: 'فتح المشروع في Android Studio',
    desc: 'افتح Android Studio -> اختَر Open an existing project -> اختَر مجلد ScientificCalculator الذي أنشأتَه.',
    badge: 'Setup'
  },
  {
    step: 2,
    title: 'التأكد من ملفات الويب داخل Assets',
    desc: 'تأكد أن ملف index.html وملفات CSS/JS داخل المسار: app/src/main/assets/www/',
    badge: 'Assets'
  },
  {
    step: 3,
    title: 'التشغيل على المحاكي أو الهاتف',
    desc: 'شغّل على محاكي أو هاتف حقيقي عبر قائمة Run -> Run "app" لتجربة الآلة الحاسبة.',
    badge: 'Run'
  },
  {
    step: 4,
    title: 'بناء نسخة التجربة (Debug APK)',
    desc: 'من القائمة العلوية: Build -> Build Bundle(s) / APK(s) -> Build APK(s). سيتم توليد ملف app-debug.apk في: app/build/outputs/apk/debug/',
    badge: 'Debug APK'
  },
  {
    step: 5,
    title: 'بناء نسخة الإصدار (Release APK)',
    desc: 'من القائمة: Build -> Generate Signed Bundle / APK -> اتبع معالج التوقيع (أدخل keystore) لاستخراج app-release.apk جاهز للنشر.',
    badge: 'Release APK'
  }
];

export const IMPORTANT_NOTES_AR = [
  'عطّل سطر WebView.setWebContentsDebuggingEnabled(true) في MainActivity.kt قبل إطلاق النسخة النهائية في متجر Google Play.',
  'اختبر تطبيق الآلة الحاسبة على هواتف حقيقية بمختلف أحجام الشاشات للتأكد من استجابة أزرار الحساب.',
  'إذا أردت دعم ملفات محلية إضافية، يمكنك تفعيل settings.allowFileAccess = true.'
];
