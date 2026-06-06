import { Component, inject, signal, WritableSignal } from '@angular/core';
import { QuerySnapshot } from 'firebase/firestore';

import { Firebase } from '../../services/firebase';

export interface UserCollection {
  docId: string;
  random: number;
}

@Component({
  selector: 'app-crud',
  imports: [],
  templateUrl: './crud.html',
  styleUrl: './crud.css',
})
export class Crud {
  public showDocsData: WritableSignal<UserCollection[]> = signal([]);

  private readonly firebase = inject(Firebase);
  private allDocsSnapshot: QuerySnapshot | null = null;

  public async createSomething(): Promise<void> {
    console.log('Create operation');
    const createData = await this.firebase.createDocument();
    console.log(createData.id);
    await this.readSomething();
  }

  public async readSomething(): Promise<void> {
    console.log('Read operation');
    const readData = await this.firebase.getAllDocuments();
    this.allDocsSnapshot = readData;
    this.showDocsData.set(readData.docs.map((x) => {
      return { docId: x.id, random: x.get('random') }
    }));
  }
  
  public async updateSomething(docId: string): Promise<void> {
    console.log(`Update operation ${docId}`);
    const doc = this.allDocsSnapshot?.docs.find(x => x.id === docId);
    if (doc) {
      await this.firebase.updateDocument(doc.ref);
      await this.readSomething();
    }
  }

  public async deleteSomething(docId: string): Promise<void> {    
    console.log(`Delete operation ${docId}`);
    const doc = this.allDocsSnapshot?.docs.find(x => x.id === docId);
    if (doc) {
      await this.firebase.deleteDocument(doc.ref);
      await this.readSomething();
    }
  }
}
