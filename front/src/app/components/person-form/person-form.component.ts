import { Component, HostBinding, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { ActivatedRoute, Router } from '@angular/router';

import { PersonService } from '../../services/person.service'

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  persons: any = [];

  person: Person = {
    fullname: '',
    birth: new Date()
  };

  constructor(private personService: PersonService, private activedRoute: ActivatedRoute, private router: Router) { }

  getListPersons() {
    this.personService.getPersons().subscribe(
      res => {
        this.persons = res;
      },
      err => console.log(err)
    );
  }

  ngOnInit(): void {
    this.getListPersons();

    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.personService.getOnePerson(params.id)
        .subscribe(
          res => {
            const values = Object.values(res);
            const fullname = values[1];
            const birth = values[2].slice(0, 10);

            (<HTMLInputElement>document.getElementById("fullname")).innerText = fullname;
            (<HTMLInputElement>document.getElementById("birth")).innerText = birth;
          },
          err => console.log(err)
        )
    }
  }

  updatePerson() {
    const personToSave = this.person.fullname;
    const personsList = this.persons;
    var addNewPerson = false;

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

    if (addNewPerson) {
      console.log("The name was updated");
      
      console.log("Valores: "+this.person.fullname +'\n'+this.person.birth);
  
      if (this.person.fullname === '') {
        console.log("El nombre no se a editado");
        (<HTMLInputElement>document.getElementById("alert")).style.display = "block";
      } else {
        const urlID = this.router.url.slice(13, 16);
        console.log(urlID);
        delete this.person.id;
        this.personService.updatePerson(urlID, this.person)
          .subscribe(
            res => {
              console.log(res);
  
              this.router.navigate(['/person']);
            },
            err => console.log(err)
        )
      }
    }
  }
}
