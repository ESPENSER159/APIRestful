import { Component, HostBinding, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { PersonService } from '../../services/person.service'
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  persons: any = [];

  person: Person = {
    fullname: '',
    birth: new Date()
  };

  constructor(private personService: PersonService, private activedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getListPersons();
    
  }

  getListPersons() {
    this.personService.getPersons().subscribe(
      res => {
        this.persons = res;
      },
      err => console.log(err)
    );
  }

  saveNewPerson() {
    const personToSave = this.person.fullname;
    const personsList = this.persons;
    var addNewPerson = false;

    if (personsList.length != 0) {
      for (let i = 0; i < personsList.length; i++) {
        const personInList = personsList[i]["fullname"];
  
        if (personToSave.trim().toLowerCase() === personInList.trim().toLowerCase()) {
          (<HTMLInputElement>document.getElementById("alert")).style.display = "block";
          break;
        } else if (i+1 === personsList.length) {
          (<HTMLInputElement>document.getElementById("alert")).style.display = "none";
          addNewPerson = true;
        }
      }
    } else {
      addNewPerson = true;
    }

    if (addNewPerson) {
      this.personService.savePerson(this.person)
        .subscribe(
          res => {
            console.log(res);
            this.getListPersons();
            (<HTMLInputElement>document.getElementById("fullnameFormSave")).value = "";
            (<HTMLInputElement>document.getElementById("birthFormSave")).value = "";
          },
          err => console.log(err)
        )
    }

  }

  deletePerson(id: string) {
    this.personService.deletePerson(id).subscribe(
      res => {
        console.log(res);
        this.getListPersons();
      },
      err => console.log(err)
    )
  }
}
