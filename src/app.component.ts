import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface Chapter {
  title: string;
  content: string[];
}

interface Story {
  title: string;
  author: string;
  chapters: Chapter[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
})
export class AppComponent implements OnInit {
  
  readonly story = signal<Story | null>(null);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    try {
      // Use the fetch API to load the JSON file from its new nested directory.
      const response = await fetch('src/stories/the-princess/story.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch story.json: ${response.status} ${response.statusText}`);
      }
      const data: Story = await response.json();
      this.story.set(data);
    } catch (e) {
      console.error('Failed to load story data:', e);
      this.error.set('Could not load story data. Please check the console for more information.');
    } finally {
      this.loading.set(false);
    }
  }
}
