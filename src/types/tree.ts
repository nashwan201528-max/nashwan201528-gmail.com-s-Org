export interface TreeNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  isArtifact?: boolean;
  extension?: string;
  size?: string;
  children?: TreeNode[];
  isOpen?: boolean;
  isLineage?: boolean;
  description?: string;
}

export type BuildVariant = 'debug' | 'release';

export type PathSeparator = ' / ' | '/' | '\\';

export interface ApkDetails {
  fileName: string;
  fullPath: string;
  size: string;
  uncompressedSize: string;
  packageName: string;
  versionName: string;
  versionCode: number;
  minSdk: number;
  minSdkName: string;
  targetSdk: number;
  targetSdkName: string;
  signatureScheme: string;
  signingKey: string;
  dexMethodsCount: number;
  permissions: string[];
  architectures: string[];
  buildDate: string;
}
