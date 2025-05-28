import { Injectable, StreamableFile, BadRequestException, NotFoundException } from "@nestjs/common";
import type { Response } from "express";
import { createReadStream, existsSync, ReadStream } from "fs";
import { join, extname } from "path";

export interface FileMetadata {
  fileName: string;
  mimeType?: string;
  filePath: string;
}

export interface IFileSenderService {
  sendFile(response: Response, fileMetadata: FileMetadata): Promise<StreamableFile>;
}

@Injectable()
export class FileSenderService implements IFileSenderService {
  private readonly defaultMimeType = 'application/octet-stream';
  private readonly mimeTypeMap = new Map<string, string>([
    ['.pdf', 'application/pdf'],
    ['.jpg', 'image/jpeg'],
    ['.jpeg', 'image/jpeg'],
    ['.png', 'image/png'],
    ['.txt', 'text/plain'],
    // Ajoutez d'autres types MIME selon vos besoins
  ]);

  /**
   * Envoie un fichier au client avec les en-têtes appropriés
   * @param response L'objet Response d'Express
   * @param fileMetadata Les métadonnées du fichier à envoyer
   * @throws {BadRequestException} Si les paramètres sont invalides
   * @throws {NotFoundException} Si le fichier n'existe pas
   */
  async sendFile(
    response: Response, 
    fileMetadata: FileMetadata
  ): Promise<StreamableFile> {
    this.validateFileMetadata(fileMetadata);
    
    const absolutePath: string = this.resolveFilePath(fileMetadata.filePath);
    this.ensureFileExists(absolutePath);

    const file: ReadStream = createReadStream(absolutePath);
    const mimeType: string = this.determineMimeType(fileMetadata);
    
    this.setResponseHeaders(response, {
      fileName: fileMetadata.fileName,
      mimeType
    });

    return new StreamableFile(file);
  }

  private validateFileMetadata(fileMetadata: FileMetadata): void {
    if (!fileMetadata.fileName || !fileMetadata.filePath) {
      throw new BadRequestException('Le nom du fichier et le chemin sont requis');
    }

    if (fileMetadata.fileName.includes('..') || fileMetadata.filePath.includes('..')) {
      throw new BadRequestException('Chemin de fichier invalide');
    }
  }

  private resolveFilePath(filePath: string): string {
    return join(process.cwd(), filePath);
  }

  private ensureFileExists(absolutePath: string): void {
    if (!existsSync(absolutePath)) {
      throw new NotFoundException('Le fichier demandé n\'existe pas');
    }
  }

  private determineMimeType(fileMetadata: FileMetadata): string {
    if (fileMetadata.mimeType) {
      return fileMetadata.mimeType;
    }

    const extension = extname(fileMetadata.fileName).toLowerCase();
    return this.mimeTypeMap.get(extension) || this.defaultMimeType;
  }

  private setResponseHeaders(
    response: Response, 
    options: { fileName: string; mimeType: string }
  ): void {
    response.set({
      'Content-Type': options.mimeType,
      'Content-Disposition': `attachment; filename="${options.fileName}"`,
      'X-Content-Type-Options': 'nosniff', // Sécurité supplémentaire
      'Cache-Control': 'no-cache' // Contrôle du cache
    });
  }
}
